import type { $State, $StateArgument } from "elexis";

export type $CSSParamValue = $StateArgument<'' | 'unset' | 'initial' | 'inherit' | 'revert' | 'revert-layer' | string & {} | number>;
export interface $CSSPropertyParams {
    /** height */
    h: $CSSParamValue;
    /** width */
    w: $CSSParamValue;
    /** margin */
    m: $CSSParamValue;
    /** margin-inline */
    mX: $CSSParamValue;
    /** margin-inline-start */
    mXS: $CSSParamValue;
    /** margin-inline-end */
    mXE: $CSSParamValue;
    /** margin-block */
    mY: $CSSParamValue;
    /** margin-block-start */
    mYS: $CSSParamValue;
    /** margin-block-end */
    mYE: $CSSParamValue;
    /** margin-top */
    mT: $CSSParamValue;
    /** margin-bottom */
    mB: $CSSParamValue;
    /** margin-left */
    mL: $CSSParamValue;
    /** margin-right */
    mR: $CSSParamValue;
    /** margin-type */
    mType: $CSSParamValue;
    /** padding */
    p: $CSSParamValue;
    /** padding-inline */
    pX: $CSSParamValue;
    /** padding-inline-start */
    pXS: $CSSParamValue;
    /** padding-inline-end */
    pXE: $CSSParamValue;
    /** padding-block */
    pY: $CSSParamValue;
    /** padding-block-start */
    pYS: $CSSParamValue;
    /** padding-block-end */
    pYE: $CSSParamValue;
    /** padding-top */
    pT: $CSSParamValue;
    /** padding-bottom */
    pB: $CSSParamValue;
    /** padding-left */
    pL: $CSSParamValue;
    /** padding-right */
    pR: $CSSParamValue;
    /** border */
    b: $CSSParamValue;
    /** border-color */
    bColor: $CSSParamValue;
    /** border-style */
    bStyle: $CSSParamValue;
    /** border-width */
    bWidth: $CSSParamValue;
    /** border-top */
    bT: $CSSParamValue;
    /** border-top-color */
    bTColor: $CSSParamValue;
    /** border-top-style */
    bTStyle: $CSSParamValue;
    /** border-top-width */
    bTWidth: $CSSParamValue;
    /** border-bottom */
    bB: $CSSParamValue;
    /** border-bottom-color */
    bBColor: $CSSParamValue;
    /** border-bottom-style */
    bBStyle: $CSSParamValue;
    /** border-bottom-width */
    bBWidth: $CSSParamValue;
    /** border-right */
    bR: $CSSParamValue;
    /** border-right-color */
    bRColor: $CSSParamValue;
    /** border-right-style */
    bRStyle: $CSSParamValue;
    /** border-right-width */
    bRWidth: $CSSParamValue;
    /** border-left */
    bL: $CSSParamValue;
    /** border-left-color */
    bLColor: $CSSParamValue;
    /** border-left-style */
    bLStyle: $CSSParamValue;
    /** border-left-width */
    bLWidth: $CSSParamValue;
    /** border-radius */
    bRadius: $CSSParamValue;
    /** border-top-left-radius */
    bTLRadius: $CSSParamValue;
    /** border-top-right-radius */
    bTRRadius: $CSSParamValue;
    /** border-bottom-left-radius */
    bBLRadius: $CSSParamValue;
    /** border-bottom-right-radius */
    bBRRadius: $CSSParamValue;
    /** border-end-end-radius */
    bEERadius: $CSSParamValue;
    /** border-end-start-radius */
    bESRadius: $CSSParamValue;
    /** border-collapse */
    bCollapse: $CSSParamValue;
    /** border-image */
    bImg: $CSSParamValue;
    /** border-image-outset */
    bImgOutset: $CSSParamValue;
    /** border-image-repeat */
    bImgRepeat: $CSSParamValue;
    /** border-image-slice */
    bImgSlice: $CSSParamValue;
    /** border-image-source */
    bImgSource: $CSSParamValue;
    /** border-image-width */
    bImgWidth: $CSSParamValue;
    /** border-spacing */
    bSpacing: $CSSParamValue;
    /** align-content */
    align: $CSSParamValue | $AlignmentBasic | $AlignmentPositional | $AlignmentBaseline | $AlignmentLegacy | $AlignmentOverflow;
    /** align-items */
    alignItems: $CSSParamValue | $AlignmentBasic | $AlignmentPositional | $AlignmentSelfPositional | $AlignmentBaseline | $AlignmentOverflow;
    /** align-self */
    alignSelf: $CSSParamValue | $AlignmentBasic | $AlignmentPositional | $AlignmentSelfPositional | $AlignmentBaseline | $AlignmentOverflow | 'auto';
    /** all */
    all: $CSSParamValue;
    /** accent-color */
    accentColor: $CSSParamValue;
    /** animation */
    a: $CSSParamValue;
    /** animation-composition */
    aComposition: $CSSParamValue;
    /** animation-delay */
    aDelay: $CSSParamValue;
    /** animation-direction */
    aDirection: $CSSParamValue;
    /** animation-duration */
    aDuration: $CSSParamValue;
    /** animation-fill-mode */
    aDillmode: $CSSParamValue;
    /** animation-iteration-count */
    aIteration: $CSSParamValue;
    /** animation-name */
    aName: $CSSParamValue;
    /** animation-play-state */
    aPlaystate: $CSSParamValue;
    /** animation-range */
    aRange: $CSSParamValue;
    /** animation-range-end */
    aRangeend: $CSSParamValue;
    /** animation-range-start */
    aRangestart: $CSSParamValue;
    /** animation-timeline */
    aTimeline: $CSSParamValue;
    /** animation-timing-function */
    aTiming: $CSSParamValue;
    /** anchor-name */
    anchor: $CSSParamValue;
    /** appearance */
    appearance: $CSSParamValue;
    /** aspect-ratio */
    aspect: $CSSParamValue;
    /** backdrop-filter */
    backdrop: $CSSParamValue;
    /** backface-visibility */
    backface: $CSSParamValue;
    /** background */
    bg: $CSSParamValue;
    /** background-attachment */
    bgAttachment: $CSSParamValue;
    /** background-blend-mode */
    bgBlendmode: $CSSParamValue;
    /** background-clip */
    bgClip: $CSSParamValue;
    /** background-color */
    bgColor: $CSSParamValue;
    /** background-image */
    bgImage: $CSSParamValue;
    /** background-origin */
    bgOrigin: $CSSParamValue;
    /** background-position */
    bgPosition: $CSSParamValue;
    /** background-position-x */
    bgX: $CSSParamValue;
    /** background-position-y */
    bgY: $CSSParamValue;
    /** background-repeat */
    bgRepeat: $CSSParamValue;
    /** background-size */
    bgSize: $CSSParamValue;
    /** block-size */
    blocksize: $CSSParamValue;
    /** bottom */
    bottom: $CSSParamValue;
    /** box-shadow */
    shadow: $CSSParamValue;
    /** box-sizing */
    sizing: $CSSParamValue | 'border-box' | 'content-box';
    /** box-decoration-break */
    decoration_break: $CSSParamValue;
    /** break-after */
    breakAfter: $CSSParamValue;
    /** break-before */
    breakBefore: $CSSParamValue;
    /** break-inside */
    breakInside: $CSSParamValue;
    /** caption-size */
    captionSize: $CSSParamValue;
    /** caret-color */
    caretColor: $CSSParamValue;
    /** clear */
    clear: $CSSParamValue;
    /** clip-path */
    clipPath: $CSSParamValue;
    /** clip-rule */
    clipRule: $CSSParamValue;
    /** color */
    color: $CSSParamValue;
    /** color-interpolation */
    colorInterpolation: $CSSParamValue;
    /** color-interpolation-filters */
    colorInterpolationFilters: $CSSParamValue;
    /** color-scheme */
    colorScheme: $CSSParamValue;
    /** column-count */
    colCount: $CSSParamValue;
    /** column-fill */
    colFill: $CSSParamValue;
    /** column-gap */
    colGap: $CSSParamValue;
    /** column-rule */
    colRule: $CSSParamValue;
    /** column-rule-color */
    colRuleColor: $CSSParamValue;
    /** column-rule-style */
    colRuleStyle: $CSSParamValue;
    /** column-rule-width */
    colRuleWidth: $CSSParamValue;
    /** column-span */
    colSpan: $CSSParamValue;
    /** column-width */
    colWidth: $CSSParamValue;
    /** columns */
    cols: $CSSParamValue;
    /** contain */
    contain: $CSSParamValue;
    /** contain-intrinsic-block-size */
    containIntrinsicBlock_size: $CSSParamValue;
    /** contain-intrinsic-height */
    containIntrinsicHeight: $CSSParamValue;
    /** contain-intrinsic-inline-size */
    containIntrinsicInline_size: $CSSParamValue;
    /** contain-intrinsic-size */
    containIntrinsicSize: $CSSParamValue;
    /** contain-intrinsic-width */
    containIntrinsicWidth: $CSSParamValue;
    /** container */
    container: $CSSParamValue;
    /** container-name */
    containerName: $CSSParamValue;
    /** container-type */
    containerType: $CSSParamValue;
    /** content */
    content: $CSSParamValue;
    /** content-visibility */
    contentVisibility: $CSSParamValue;
    /** counter-increment */
    counterIncrement: $CSSParamValue;
    /** counter-reset */
    counterReset: $CSSParamValue;
    /** counter-set */
    counterSet: $CSSParamValue;
    /** cursor */
    cursor: $CSSParamValue | 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' |'s-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'zoom-in' | 'zoom-out';
    /** cx */
    cx: $CSSParamValue;
    /** cy */
    cy: $CSSParamValue;
    /** d */
    d: $CSSParamValue;
    /** direction */
    dir: $CSSParamValue;
    /** display */
    display: $CSSParamValue | 'flex' | 'block' | 'inline' | 'inline-block' | 'grid' | 'table' | 'inline-flex' | 'inline-grid' | 'flow-root' | 'none' | 'contents';
    /** dominant-baseline */
    dominantBaseline: $CSSParamValue;
    /** empty-cells */
    emptyCells: $CSSParamValue;
    /** field-sizing */
    fieldSizing: $CSSParamValue;
    /** fill */
    fill: $CSSParamValue;
    /** fill-opacity */
    fillOpacity: $CSSParamValue;
    /** fill-rule */
    fillRule: $CSSParamValue;
    /** filter */
    filter: $CSSParamValue;
    /** flex */
    flex: $CSSParamValue;
    /** flex-basis */
    flexBasis: $CSSParamValue;
    /** flex-direction */
    flexDir: $CSSParamValue | 'row' | 'column' | 'row-reverse' | 'column-reverse';
    /** flex-flow */
    flexFlow: $CSSParamValue;
    /** flex-grow */
    flexGrow: $CSSParamValue;
    /** flex-shrink */
    flexShrink: $CSSParamValue;
    /** flex-wrap */
    flexWrap: $CSSParamValue;
    /** float */
    float: $CSSParamValue;
    /** flood-color */
    floodColor: $CSSParamValue;
    /** flood-opacity */
    floodOpacity: $CSSParamValue;
    /** font */
    font: $CSSParamValue;
    /** font-family */
    fontFamily: $CSSParamValue;
    /** font-feature-settings */
    fontFeature: $CSSParamValue;
    /** font-kerning */
    fontKerning: $CSSParamValue;
    /** font-language-override */
    fontLang: $CSSParamValue;
    /** font-optical-sizing */
    fontOptical: $CSSParamValue;
    /** font-palette */
    fontPalette: $CSSParamValue;
    /** font-size */
    fontSize: $CSSParamValue;
    /** font-size-adjust */
    fontSizeAdjust: $CSSParamValue;
    /** font-smooth */
    fontSmooth: $CSSParamValue;
    /** font-stretch */
    fontStretch: $CSSParamValue;
    /** font-style */
    fontStyle: $CSSParamValue;
    /** font-synthesis */
    fontSynth: $CSSParamValue;
    /** font-synthesis */
    fontSynthPosition: $CSSParamValue;
    /** font-synthesis-small-caps */
    fontSynthSmallcaps: $CSSParamValue;
    /** font-synthesis-style */
    fontSynthStyle: $CSSParamValue;
    /** font-synthesis-weight */
    fontSynthWeight: $CSSParamValue;
    /** font-variant */
    fontVar: $CSSParamValue;
    /** font-variant-alternates */
    fontVarAlter: $CSSParamValue;
    /** font-variant-caps */
    fontVarCaps: $CSSParamValue;
    /** font-variant-east-asian */
    fontVarEA: $CSSParamValue;
    /** font-variant-emoji */
    fontVarEmoji: $CSSParamValue;
    /** font-variant-ligatures */
    fontVarLigatures: $CSSParamValue;
    /** font-variant-numeric */
    fontVarNum: $CSSParamValue;
    /** font-variant-position */
    fontVarPos: $CSSParamValue;
    /** font-variant-settings */
    fontVarSettings: $CSSParamValue;
    /** font-weight */
    fontWeight: $CSSParamValue;
    /** forced-color-adjust */
    forcedColor: $CSSParamValue;
    /** gap */
    gap: $CSSParamValue;
    /** grid */
    g: $CSSParamValue;
    /** grid-area */
    gArea: $CSSParamValue;
    /** grid-auto-col */
    gAutoCol: $CSSParamValue;
    /** grid-auto-rows */
    gAutoRows: $CSSParamValue;
    /** grid-column */
    gCol: $CSSParamValue;
    /** grid-column-end */
    gColEnd: $CSSParamValue;
    /** grid-column-start */
    gColStart: $CSSParamValue;
    /** grid-row */
    gRow: $CSSParamValue;
    /** grid-row-end */
    gRowEnd: $CSSParamValue;
    /** grid-row-start */
    gRowStart: $CSSParamValue;
    /** grid-template */
    gTemplate: $CSSParamValue;
    /** grid-template-areas */
    gTemplateAreas: $CSSParamValue;
    /** grid-template-columns */
    gTemplateCol: $CSSParamValue;
    /** grid-template-rows */
    gTemplateRow: $CSSParamValue;
    /** hanging-punctuation */
    hanging: $CSSParamValue;
    /** hyphenate */
    hyp: $CSSParamValue;
    /** hyphenate-character */
    hypChar: $CSSParamValue;
    /** hyphenate-limit-chars */
    hypLimitChars: $CSSParamValue;
    /** hyphens */
    hyps: $CSSParamValue;
    /** image-orientation */
    imgOrientation: $CSSParamValue;
    /** image-rendering */
    imgRendering: $CSSParamValue;
    /** image-resolution */
    imgResolution: $CSSParamValue;
    /** initial-letter */
    initLetter: $CSSParamValue;
    /** inline-size */
    inlineSize: $CSSParamValue;
    /** inset */
    inset: $CSSParamValue;
    /** inset-block */
    insetY: $CSSParamValue;
    /** inset-block-end */
    insetyE: $CSSParamValue;
    /** inset-block-start */
    insetyS: $CSSParamValue;
    /** inset-inline */
    insetX: $CSSParamValue;
    /** inset-inline-end */
    insetXE: $CSSParamValue;
    /** inset-inline-start */
    insetXS: $CSSParamValue;
    /** interpolate-size */
    interPolate: $CSSParamValue;
    /** isolation */
    isolation: $CSSParamValue;
    /** justify-content */
    justify: $CSSParamValue | $AlignmentBasic | $AlignmentPositional | $AlignmentPositionalJustify | $AlignmentDistributed | $AlignmentOverflow;
    /** justify-items */
    justifyItems: $CSSParamValue | $AlignmentBasic | $AlignmentPositional | $AlignmentPositionalJustify | $AlignmentSelfPositional | $AlignmentBaseline | $AlignmentLegacy | $AlignmentOverflow | 'auto';
    /** justify-self */
    justifySelf: $CSSParamValue | $AlignmentBasic | $AlignmentPositional | $AlignmentPositionalJustify | $AlignmentSelfPositional | $AlignmentBaseline | $AlignmentOverflow | 'auto';
    /** left */
    left: $CSSParamValue;
    /** letter-spacing */
    letterSpacing: $CSSParamValue;
    /** lighting-color */
    lighting: $CSSParamValue;
    /** line-break */
    lineBreak: $CSSParamValue;
    /** line-height */
    lineHeight: $CSSParamValue;
    /** line-height-step */
    lineHeightStep: $CSSParamValue;
    /** list-style */
    list: $CSSParamValue;
    /** list-style-image */
    listImg: $CSSParamValue;
    /** list-style-position */
    listPos: $CSSParamValue;
    /** list-style-type */
    listType: $CSSParamValue;
    /** marker */
    marker: $CSSParamValue;
    /** marker-end */
    markerE: $CSSParamValue;
    /** marker-mid */
    markerM: $CSSParamValue;
    /** marker-start */
    markerS: $CSSParamValue;
    /** mask */
    mask: $CSSParamValue;
    /** mask-border */
    maskB: $CSSParamValue;
    /** mask-border-mode */
    maskBMode: $CSSParamValue;
    /** mask-border-outset */
    maskBOutset: $CSSParamValue;
    /** mask-border-repeat */
    maskBRepeat: $CSSParamValue;
    /** mask-border-slice */
    maskBSlice: $CSSParamValue;
    /** mask-border-source */
    maskBSource: $CSSParamValue;
    /** mask-border-width */
    maskBWidth: $CSSParamValue;
    /** mask-clip */
    maskClip: $CSSParamValue;
    /** mask-composite */
    maskComposite: $CSSParamValue;
    /** mask-image */
    maskimg: $CSSParamValue;
    /** mask-mode */
    maskMode: $CSSParamValue;
    /** mask-position */
    maskPos: $CSSParamValue;
    /** mask-origin */
    maskOrigin: $CSSParamValue;
    /** mask-repeat */
    maskRepeat: $CSSParamValue;
    /** mask-size */
    maskSize: $CSSParamValue;
    /** mask-type */
    maskType: $CSSParamValue;
    /** math-depth */
    mathDepth: $CSSParamValue;
    /** math-shift */
    mathShift: $CSSParamValue;
    /** math-style */
    mathStyle: $CSSParamValue;
    /** max-block-size */
    maxY: $CSSParamValue;
    /** max-height */
    maxH: $CSSParamValue;
    /** max-inline-size */
    maxX: $CSSParamValue;
    /** max-width */
    maxW: $CSSParamValue;
    /** min-block-size */
    minY: $CSSParamValue;
    /** min-height */
    minH: $CSSParamValue;
    /** min-inline-size */
    minX: $CSSParamValue;
    /** min-width */
    minW: $CSSParamValue;
    /** mix-blend-mode */
    mix: $CSSParamValue;
    /** object-fit */
    objFit: $CSSParamValue | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    /** object-position */
    objPos: $CSSParamValue;
    /** offset */
    offset: $CSSParamValue;
    /** offset-anchor */
    offsetAnchor: $CSSParamValue;
    /** offset-distance */
    offsetDist: $CSSParamValue;
    /** offset-path */
    offsetPath: $CSSParamValue;
    /** offset-position */
    offsetPos: $CSSParamValue;
    /** offset-rotate */
    offsetRot: $CSSParamValue;
    /** opacity */
    o: $CSSParamValue;
    /** order */
    order: $CSSParamValue;
    /** orphans */
    orphans: $CSSParamValue;
    /** outline */
    outline: $CSSParamValue;
    /** outline-color */
    outlineColor: $CSSParamValue;
    /** outline-offset */
    outlineOffset: $CSSParamValue;
    /** outline-style */
    outlineStyle: $CSSParamValue;
    /** outline-width */
    outlineWidth: $CSSParamValue;
    /** overflow */
    overflow: $CSSParamValue | $Overflow;
    /** overflow-anchor */
    overflowAnchor: $CSSParamValue;
    /** overflow-clip-margin */
    overflowClip: $CSSParamValue;
    /** overflow-inline */
    overflowInline: $CSSParamValue;
    /** overflow-wrap */
    overflowWrap: $CSSParamValue;
    /** overflow-x */
    overflowX: $CSSParamValue | $Overflow;
    /** overflow-y */
    overflowY: $CSSParamValue | $Overflow;
    /** overlay */
    overlay: $CSSParamValue;
    /** overscroll-behavior */
    overscrollBehavior: $CSSParamValue;
    /** overscroll-behavior-block */
    overscrollBlock: $CSSParamValue;
    /** overscroll-behavior-inline */
    overscrollInline: $CSSParamValue;
    /** overscroll-behavior-x */
    overscrollX: $CSSParamValue;
    /** overscroll-behavior-y */
    overscrollY: $CSSParamValue;
    /** page */
    page: $CSSParamValue;
    /** paint-order */
    paintOrder: $CSSParamValue;
    /** perspective */
    perspective: $CSSParamValue;
    /** perspective-origin */
    perspectiveOrigin: $CSSParamValue;
    /** place-content */
    place: $CSSParamValue;
    /** place-items */
    placeItems: $CSSParamValue;
    /** place-self */
    placeSelf: $CSSParamValue;
    /** pointer-events */
    pointer: $CSSParamValue;
    /** position */
    pos: $CSSParamValue | 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
    /** position-anchor */
    posAnchor: $CSSParamValue;
    /** position-area */
    posArea: $CSSParamValue;
    /** position-try */
    posTry: $CSSParamValue;
    /** position-try-fallbacks */
    posTryFallbacks: $CSSParamValue;
    /** position-try-order */
    posTryOrder: $CSSParamValue;
    /** position-visibility */
    posVisibility: $CSSParamValue;
    /** print-color-adjust */
    printColor: $CSSParamValue;
    /** quotes */
    quotes: $CSSParamValue;
    /** r */
    r: $CSSParamValue;
    /** resize */
    resize: $CSSParamValue;
    /** right */
    right: $CSSParamValue;
    /** rotate */
    rot: $CSSParamValue;
    /** row-gap */
    rowGap: $CSSParamValue;
    /** ruby-align */
    rubyAlign: $CSSParamValue;
    /** ruby-position */
    rubyPos: $CSSParamValue;
    /** rx */
    rx: $CSSParamValue;
    /** ry */
    ry: $CSSParamValue;
    /** scale */
    scale: $CSSParamValue;
    /** scroll-behavior */
    scrollBehavior: $CSSParamValue;
    /** scroll-margin */
    scrollM: $CSSParamValue;
    /** scroll-margin-inline */
    scrollMX: $CSSParamValue;
    /** scroll-margin-inline-end */
    scrollMXE: $CSSParamValue;
    /** scroll-margin-inline-start */
    scrollMXS: $CSSParamValue;
    /** scroll-margin-block */
    scrollMY: $CSSParamValue;
    /** scroll-margin-block-end */
    scrollMYE: $CSSParamValue;
    /** scroll-margin-block-start */
    scrollMYS: $CSSParamValue;
    /** scroll-margin-left */
    scrollML: $CSSParamValue;
    /** scroll-margin-right */
    scrollMR: $CSSParamValue;
    /** scroll-margin-top */
    scrollMT: $CSSParamValue;
    /** scroll-margin-bottom */
    scrollMB: $CSSParamValue;
    /** scroll-padding-block */
    scrollPY: $CSSParamValue;
    /** scroll-padding-block-start */
    scrollPYS: $CSSParamValue;
    /** scroll-padding-block-end */
    scrollPYE: $CSSParamValue;
    /** scroll-padding-inline */
    scrollPX: $CSSParamValue;
    /** scroll-padding-inline-start */
    scrollPXS: $CSSParamValue;
    /** scroll-padding-inline-end */
    scrollPXE: $CSSParamValue;
    /** scroll-padding-left */
    scrollPL: $CSSParamValue;
    /** scroll-padding-right */
    scrollPR: $CSSParamValue;
    /** scroll-padding-top */
    scrollPT: $CSSParamValue;
    /** scroll-padding-bottom */
    scrollPB: $CSSParamValue;
    /** scroll-snap-align */
    scrollSnapAlign: $CSSParamValue;
    /** scroll-snap-type */
    scrollSnapType: $CSSParamValue;
    /** scroll-timeline */
    scrollTimeline: $CSSParamValue;
    /** scroll-timeline-axis */
    scrollTimelineAxis: $CSSParamValue;
    /** scroll-timeline-name */
    scrollTimelineName: $CSSParamValue;
    /** scrollbar-color */
    scrollbarColor: $CSSParamValue;
    /** scrollbar-gutter */
    scrollbarGutter: $CSSParamValue;
    /** scrollbar-width */
    scrollbarWidth: $CSSParamValue;
    /** shape-image-threshold */
    shapeImgThreshold: $CSSParamValue;
    /** shape-margin */
    shapeMargin: $CSSParamValue;
    /** shape-outside */
    shapeOutside: $CSSParamValue;
    /** shape-rendering */
    shapeRendering: $CSSParamValue;
    /** stop-color */
    stopColor: $CSSParamValue;
    /** stop-opacity */
    stopOpacity: $CSSParamValue;
    /** stroke */
    stroke: $CSSParamValue;
    /** stroke-dash-array */
    strokeDashArray: $CSSParamValue;
    /** stroke-dashoffset */
    strokeDashOffset: $CSSParamValue;
    /** stroke-linecap */
    strokeLinecap: $CSSParamValue;
    /** stroke-linejoin */
    strokeLinejoin: $CSSParamValue;
    /** stroke-miterlimit */
    strokeMiterlimit: $CSSParamValue;
    /** stroke-opacity */
    strokeOpacity: $CSSParamValue;
    /** stroke-width */
    strokeWidth: $CSSParamValue;
    /** tab-size */
    tabSize: $CSSParamValue;
    /** table-layout */
    tableLayout: $CSSParamValue;
    /** text-align */
    txtAlign: $CSSParamValue;
    /** text-align-last */
    txtAlignLast: $CSSParamValue;
    /** text-anchor */
    txtAnchor: $CSSParamValue;
    /** text-combine-upright */
    txtCombineUpright: $CSSParamValue;
    /** text-decoration */
    txtDecor: $CSSParamValue;
    /** text-decoration-color */
    txtDecorColor: $CSSParamValue;
    /** text-decoration-line */
    txtDecorLine: $CSSParamValue;
    /** text-decoration-skip */
    txtDecorSkip: $CSSParamValue;
    /** text-decoration-skip-ink */
    txtDecorSkipInk: $CSSParamValue;
    /** text-decoration-style */
    txtDecorStyle: $CSSParamValue;
    /** text-decoration-thickness */
    txtDecorThickness: $CSSParamValue;
    /** text-emphasis */
    txtEmp: $CSSParamValue;
    /** text-emphasis-color */
    txtEmpColor: $CSSParamValue;
    /** text-emphasis-position */
    txtEmpPos: $CSSParamValue;
    /** text-emphasis-style */
    txtEmpStyle: $CSSParamValue;
    /** text-indent */
    txtIndent: $CSSParamValue;
    /** text-justify */
    txtJustify: $CSSParamValue;
    /** text-orientation */
    txtOrientation: $CSSParamValue;
    /** text-overflow */
    txtOverflow: $CSSParamValue;
    /** text-rendering */
    txtRendering: $CSSParamValue;
    /** text-shadow */
    txtShadow: $CSSParamValue;
    /** text-size-adjust */
    txtSizeAdjust: $CSSParamValue;
    /** text-size-trim */
    txtSpacingTrim: $CSSParamValue;
    /** text-transform */
    txtTransform: $CSSParamValue;
    /** text-underline-offset */
    txtUnderlineOffset: $CSSParamValue;
    /** text-underline-position */
    txtUnderlinePosition: $CSSParamValue;
    /** text-wrap */
    txtWrap: $CSSParamValue;
    /** text-wrap-mode */
    txtWrapMode: $CSSParamValue;
    /** text-wrap-style */
    textWrapStyle: $CSSParamValue;
    /** timeline-scope */
    timelineScope: $CSSParamValue;
    /** top */
    top: $CSSParamValue;
    /** touch-action */
    touchAction: $CSSParamValue;
    /** transform */
    transform: $CSSParamValue;
    /** transform-origin */
    tOrigin: $CSSParamValue;
    /** transform-style */
    tStyle: $CSSParamValue;
    /** transition */
    transition: $CSSParamValue;
    /** transition-behavior */
    tBehavior: $CSSParamValue;
    /** transition-delay */
    tDelay: $CSSParamValue;
    /** transition-duration */
    tDuration: $CSSParamValue;
    /** transition-property */
    tProperty: $CSSParamValue;
    /** transition-timing-function */
    tTiming: $CSSParamValue;
    /** translate */
    translate: $CSSParamValue;
    /** unicode-bldi */
    unicodeBldi: $CSSParamValue;
    /** user-select */
    userSelect: $CSSParamValue;
    /** vector-effect */
    vectorEffect: $CSSParamValue;
    /** vector-align */
    vectorAlign: $CSSParamValue;
    /** view-timeline */
    viewTimeline: $CSSParamValue;
    /** view-timeline-axis */
    viewTimelineAxis: $CSSParamValue;
    /** view-timeline-inset */
    viewTimelineInset: $CSSParamValue;
    /** view-timeline-name */
    viewTimelineName: $CSSParamValue;
    /** view-transition-name */
    viewTransitionName: $CSSParamValue;
    /** visibility */
    visibility: $CSSParamValue;
    /** white-space */
    whiteSpace: $CSSParamValue;
    /** white-space-collapse */
    whiteSpaceCollapse: $CSSParamValue;
    /** widows */
    widows: $CSSParamValue;
    /** will-change */
    willChange: $CSSParamValue;
    /** word-break */
    wordBreak: $CSSParamValue;
    /** word-spacing */
    wordSpacing: $CSSParamValue;
    /** writing-mode */
    writingMode: $CSSParamValue;
    /** x */
    x: $CSSParamValue;
    /** y */
    y: $CSSParamValue;
    /** z-index */
    z: $CSSParamValue;
    /** zoom */
    zoom: $CSSParamValue;
}

type $AlignmentBasic = 'normal' | 'stretch';
type $AlignmentPositional = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end';
type $AlignmentPositionalJustify = 'left' | 'right';
type $AlignmentSelfPositional = 'self-start' | 'self-end' | 'anchor-center';
type $AlignmentBaseline = 'baseline' | 'first baseline' | 'last baseline';
type $AlignmentLegacy = 'legacy right' | 'legacy left' | 'legacy center';
type $AlignmentOverflow = 'safe center' | 'unsafe center';
type $AlignmentDistributed = 'space-between' | 'space-around' | 'space-evenly';

type $Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'hidden visible'