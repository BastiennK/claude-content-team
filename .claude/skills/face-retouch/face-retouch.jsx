#target photoshop
// face-retouch.jsx - non-destructive "thumbnail quality" pass on the creator's photo layer.
// Run in Photoshop 2026: select the PHOTO layer (the cut-out of the creator), then
// File > Scripts > Browse... and pick this file.
//
// What it does (every step is optional and separate, so nothing is baked in):
//   1. Converts the photo layer to a Smart Object (keeps the cut-out mask inside it).
//   2. Adds a Camera Raw Filter as a Smart Filter (shadows up, highlights down, clarity, sharpening, noise) - editable.
//   3. Adds clipped adjustment layers above the photo:
//        - "FR Curves contrast": soft S-curve (punchier face, deeper hair/shirt)
//        - "FR Vibrance": +25 vibrance (healthier skin without orange saturation)
//   4. Lists the manual steps that need a human eye (Camera Raw, Neural Filters, eyes, rim light).
// If a step fails in your Photoshop version, it is skipped and listed in the closing message.
// All function and variable names are prefixed "fr" to avoid clashes with ExtendScript globals.

// ---- Settings: change these for the photo you are retouching ----
// Warm lamp light (yellow/orange skin): FR_TEMPERATURE -15 and FR_YELLOWS -30.
// Phone photos are already sharp: keep FR_CLARITY <= 8 and FR_SHARPEN <= 35 (more looks plastic).
var FR_TEMPERATURE = 0;   // negative = cooler / less yellow (-10 to -20 for lamp light)
var FR_TINT = 0;          // + magenta / - green
var FR_CLARITY = 10;      // local contrast (0-12); too high = plastic skin, blotchy hands
var FR_SHARPEN = 40;      // Camera Raw sharpening (25-50)
var FR_VIBRANCE = 25;     // clipped vibrance layer (0-30); boosts warm skin too
var FR_YELLOWS = 0;       // clipped Hue/Saturation on Yellows only (-20 to -40 removes yellow skin); 0 = skip

var frDone = [];
var frSkipped = [];

function frC(s) { return charIDToTypeID(s); }
function frS(s) { return stringIDToTypeID(s); }

function frStep(name, fn) {
    try { fn(); frDone.push(name); }
    catch (e) { frSkipped.push(name + " (" + e.message + ")"); }
}

function frToSmartObject() {
    executeAction(frS("newPlacedLayer"), undefined, DialogModes.NO);
}

function frSharpen(doc) {
    doc.activeLayer.applyUnSharpMask(90, 1.3, 2);
}

// Camera Raw Filter as a Smart Filter: lift the face, recover highlights, add local contrast, sharpen
function frCameraRaw() {
    var d = new ActionDescriptor();
    d.putString(frC("CMod"), "Filter");
    d.putEnumerated(frC("Sett"), frC("Sett"), frC("Cst "));
    if (FR_TEMPERATURE !== 0 || FR_TINT !== 0) {
        d.putEnumerated(frC("WBal"), frC("WBal"), frC("Cst "));
        d.putInteger(frC("Temp"), FR_TEMPERATURE);
        d.putInteger(frC("Tint"), FR_TINT);
    }
    d.putDouble(frC("Ex12"), 0.10);
    d.putInteger(frC("Cr12"), 12);
    d.putInteger(frC("Hi12"), -50);
    d.putInteger(frC("Sh12"), 30);
    d.putInteger(frC("Wh12"), 0);
    d.putInteger(frC("Bk12"), -12);
    d.putInteger(frC("Cl12"), FR_CLARITY);
    d.putInteger(frC("Vibr"), 12);
    d.putInteger(frC("Shrp"), FR_SHARPEN);
    d.putInteger(frC("LNR "), 20);
    executeAction(frS("Adobe Camera Raw Filter"), d, DialogModes.NO);
}

// Make a clipped adjustment layer of the given type, then return it
function frMakeAdj(typeId, typeDesc, name) {
    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putClass(frC("AdjL"));
    d.putReference(frC("null"), r);
    var d2 = new ActionDescriptor();
    d2.putString(frC("Nm  "), name);
    d2.putBoolean(frC("Grup"), true);
    d2.putObject(frC("Type"), typeId, typeDesc);
    d.putObject(frC("Usng"), frC("AdjL"), d2);
    executeAction(frC("Mk  "), d, DialogModes.NO);
}

function frCurves() {
    var t = new ActionDescriptor();
    t.putEnumerated(frS("presetKind"), frS("presetKindType"), frS("presetKindDefault"));
    frMakeAdj(frC("Crvs"), t, "FR Curves contrast (lower Opacity to soften)");
    // set a soft S-curve on the composite channel
    var s = new ActionDescriptor();
    var r = new ActionReference();
    r.putEnumerated(frC("AdjL"), frC("Ordn"), frC("Trgt"));
    s.putReference(frC("null"), r);
    var cd = new ActionDescriptor();
    cd.putEnumerated(frS("presetKind"), frS("presetKindType"), frS("presetKindCustom"));
    var adjs = new ActionList();
    var ch = new ActionDescriptor();
    var cr = new ActionReference();
    cr.putEnumerated(frC("Chnl"), frC("Chnl"), frC("Cmps"));
    ch.putReference(frC("Chnl"), cr);
    var pts = [[0, 0], [64, 50], [128, 131], [192, 208], [255, 255]];
    var pl = new ActionList(), i, p;
    for (i = 0; i < pts.length; i++) {
        p = new ActionDescriptor();
        p.putDouble(frC("Hrzn"), pts[i][0]);
        p.putDouble(frC("Vrtc"), pts[i][1]);
        pl.putObject(frC("Pnt "), p);
    }
    ch.putList(frC("Crv "), pl);
    adjs.putObject(frC("CrvA"), ch);
    cd.putList(frC("Adjs"), adjs);
    s.putObject(frC("T   "), frC("Crvs"), cd);
    executeAction(frC("setd"), s, DialogModes.NO);
}

function frVibrance() {
    var t = new ActionDescriptor();
    t.putInteger(frS("vibrance"), FR_VIBRANCE);
    t.putInteger(frC("Strt"), 0);
    frMakeAdj(frS("vibrance"), t, "FR Vibrance +" + FR_VIBRANCE);
}

// Hue/Saturation on the Yellows range only: takes lamp-yellow out of skin without greying the rest
function frYellows() {
    var t = new ActionDescriptor();
    t.putEnumerated(frS("presetKind"), frS("presetKindType"), frS("presetKindCustom"));
    t.putBoolean(frC("Clrz"), false);
    var l = new ActionList();
    var a = new ActionDescriptor();
    a.putInteger(frC("LclR"), 3);
    a.putInteger(frC("BgnR"), 15);
    a.putInteger(frC("BgnS"), 45);
    a.putInteger(frC("EndS"), 75);
    a.putInteger(frC("EndR"), 105);
    a.putInteger(frC("H   "), 0);
    a.putInteger(frC("Strt"), FR_YELLOWS);
    a.putInteger(frC("Lght"), 0);
    l.putObject(frC("Hst2"), a);
    t.putList(frC("Adjs"), l);
    frMakeAdj(frC("HStr"), t, "FR Less yellow (Yellows " + FR_YELLOWS + ")");
}

function frBrightness() {
    var t = new ActionDescriptor();
    t.putInteger(frC("Brgh"), 8);
    t.putInteger(frC("Cntr"), 0);
    t.putBoolean(frS("useLegacy"), false);
    frMakeAdj(frC("BrgC"), t, "FR Brightness lift +8");
}

function frStart() {
    if (!app.documents.length) { alert("Open the thumbnail PSD first, then select the photo layer."); return; }
    var doc = app.activeDocument;
    var layer = doc.activeLayer;
    if (layer.typename !== "ArtLayer" || layer.kind === LayerKind.TEXT) {
        alert("Select the PHOTO layer of the creator (not a group or a text layer), then run this again.");
        return;
    }
    var oldDialogs = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;
    try {
        if (layer.kind !== LayerKind.SMARTOBJECT) { frStep("Convert photo to Smart Object", frToSmartObject); }
        var photo = doc.activeLayer;
        frStep("Camera Raw Filter as Smart Filter (temp " + FR_TEMPERATURE + ", clarity " + FR_CLARITY + ", sharpen " + FR_SHARPEN + ")", frCameraRaw);
        doc.activeLayer = photo;
        // No extra Unsharp Mask: on a cut-out it draws a dark halo around the hair edge. Camera Raw sharpening only.
        doc.activeLayer = photo;
        frStep("Curves soft S-curve (clipped)", frCurves);
        if (FR_VIBRANCE) { frStep("Vibrance +" + FR_VIBRANCE + " (clipped)", frVibrance); }
        if (FR_YELLOWS) { frStep("Less yellow skin: Yellows saturation " + FR_YELLOWS + " (clipped)", frYellows); }
    } finally {
        app.displayDialogs = oldDialogs;
    }
    var msg = "Face retouch pass finished.\n\nDone:\n- " + (frDone.length ? frDone.join("\n- ") : "nothing");
    if (frSkipped.length) { msg += "\n\nSkipped (do by hand, see the skill guide):\n- " + frSkipped.join("\n- "); }
    msg += "\n\nNext, by hand (2-5 min): Camera Raw Filter on the Smart Object, eye brighten, rim light/shadow. See .claude/skills/face-retouch/SKILL.md.";
    alert(msg);
}

frStart();
