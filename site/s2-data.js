/* Season 2, from the owner's sheet (rows after 112), written by tools/site/make_s2.py; never edit by hand */
var S2_HEADER=["ROUND", "TICKER", "CALL DATE (T-1)", "GPT DIR", "GPT MAG (%)", "CLAUDE DIR", "CLAUDE MAG (%)", "GROK DIR", "GROK MAG (%)", "GEMINI DIR", "GEMINI MAG (%)", "QWEN DIR", "QWEN MAG (%)", "RESOLUTION DATE/TIME", "ACTUAL MOVE (%)", "SECTOR"];
var S2_SHEET=[
 ["113", "INTU", "11/19/26", "UP", "4.5", "DOWN", "4", "DOWN", "2.4", "UP", "5", "UP", "4", "11/20/26", "-12.79", "Information Technology"],
 ["114", "KEYS", "11/19/26", "UP", "5.5", "UP", "4", "DOWN", "2.2", "DOWN", "6", "UP", "5", "11/20/26", "-7.07", "Information Technology"],
 ["115", "ESTC", "11/19/26", "UP", "7", "UP", "6", "UP", "2.8", "UP", "11.5", "DOWN", "8", "11/20/26", "-2.20", "Information Technology"],
 ["116", "ZOOM", "11/23/26", "DOWN", "4.5", "DOWN", "3", "DOWN", "2.8", "DOWN", "5.5", "DOWN", "4", "", "", "Information Technology"],
 ["117", "SMTC", "11/23/26", "UP", "9", "DOWN", "3", "DOWN", "3.6", "DOWN", "7.5", "UP", "5", "", "", "Information Technology"],
 ["118", "SYM", "11/23/26", "UP", "7", "DOWN", "5", "DOWN", "4.1", "DOWN", "9.5", "DOWN", "4", "", "", "Industrials"],
 ["119", "DELL", "11/24/26", "UP", "8", "DOWN", "3", "DOWN", "3.2", "DOWN", "4.5", "DOWN", "5", "", "", "Information Technology"],
 ["120", "WDAY", "11/24/26", "DOWN", "5", "DOWN", "3", "DOWN", "2.1", "DOWN", "3.5", "DOWN", "3", "", "", "Information Technology"],
 ["121", "AMBA", "11/24/26", "UP", "8.5", "DOWN", "6", "DOWN", "4.4", "DOWN", "4", "DOWN", "3", "", "", "Information Technology"],
 ["122", "HPQ", "11/24/26", "DOWN", "7", "DOWN", "3.5", "DOWN", "1.9", "DOWN", "4.5", "DOWN", "2", "", "", "Information Technology"],
 ["123", "ADSK", "11/24/26", "UP", "5.5", "DOWN", "2.5", "DOWN", "2.3", "UP", "3.5", "UP", "0.5", "", "", "Information Technology"]];
var S2_NAME={"INTU": "Intuit", "KEYS": "Keysight", "ESTC": "Elastic", "ZOOM": "Zoom", "SMTC": "Semtech", "SYM": "Symbotic", "MDT": "Medtronic", "ADI": "Analog Devices", "DELL": "Dell", "WDAY": "Workday", "AMBA": "Ambarella", "HPQ": "HP", "ADSK": "Autodesk"};
var S2_REPORT={"ZOOM": ["2026-11-23T21:05:00Z", 1, "after the close"], "SMTC": ["2026-11-23T21:05:00Z", 1, "after the close"], "SYM": ["2026-11-23T21:05:00Z", 1, "after the close"], "MDT": ["2026-11-24T11:45:00Z", 0, "before the open"], "ADI": ["2026-11-24T12:00:00Z", 0, "before the open"], "DELL": ["2026-11-24T21:05:00Z", 1, "after the close"], "WDAY": ["2026-11-24T21:05:00Z", 1, "after the close"], "AMBA": ["2026-11-24T21:05:00Z", 1, "after the close"], "HPQ": ["2026-11-24T21:05:00Z", 1, "after the close"], "ADSK": ["2026-11-24T21:05:00Z", 1, "after the close"]};
