import React, { useState, useEffect, useRef, useCallback } from "react";
import { CheckSquare, Square, Trash2, Plus, Utensils, Droplets, ListTodo, X, RotateCcw, Calendar, Scale, ArrowUp, ArrowDown, Minus, BookOpen, ChevronLeft, History } from "lucide-react";

const WATER_GOAL = 4000; // ml
const WATER_QUICK_ADDS = [200, 330, 500];

const palette = {
  bg: "#F8F3EB",
  surface: "#FFFDF8",
  border: "#E7D9C8",
  ink: "#27231F",
  mutedInk: "#887B6A",
  tasksAccent: "#4F7A58",
  tasksAccentSoft: "#E7F0E7",
  foodAccent: "#C66735",
  foodAccentSoft: "#F8E2D2",
  waterAccent: "#2F75A8",
  waterAccentSoft: "#DDEFF8",
  weightAccent: "#83586A",
  weightAccentSoft: "#F0E1E7",
  danger: "#B5544A",
};


const TASK_STATUS = {
  not_done: "לא בוצע",
  done: "בוצע",
};

const TASK_PRIORITY = {
  high: "דחופה",
  normal: "רגילה",
  low: "נמוכה",
};

const FOOD_SUGGESTIONS = [
  "שווארמה",
  "שווארמה בצלחת",
  "שווארמה בפיתה",
  "שווארמה בלאפה",
  "שווארמה בבאגט",
  "פרגית",
  "פרגית בפיתה",
  "פרגית בלאפה",
  "קבב",
  "קבב בפיתה",
  "קבב בצלחת",
  "המבורגר",
  "צ׳יזבורגר",
  "נקניקיה",
  "סטייק",
  "אנטריקוט",
  "סינטה",
  "אסאדו",
  "חזה עוף",
  "עוף",
  "כרעיים",
  "כנפיים",
  "שניצל",
  "שניצלונים",
  "חזה עוף על האש",
  "קציצות",
  "כדורי בשר",
  "צלי בקר",
  "גולאש",
  "בשר טחון",
  "עראייס",
  "מעורב ירושלמי",
  "חמין",
  "טונה",
  "סלמון",
  "דג לבן",
  "אמנון",
  "נסיכת הנילוס",
  "דניס",
  "חביתה",
  "ביצה",
  "ביצים",
  "מקושקשת",
  "שקשוקה",
  "פיצה",
  "משולש פיצה",
  "פיצה משפחתית",
  "פיצה אישית",
  "פיצה מרגריטה",
  "פיצה פפרוני",
  "פיצה טונה",
  "פיצה פטריות",
  "פיצה זיתים",
  "פוקאצ׳ה",
  "טוסט",
  "טוסט גבינה",
  "טוסט נקניק",
  "בורקס",
  "בורקס גבינה",
  "בורקס תפוח אדמה",
  "מלאווח",
  "ג׳חנון",
  "פיתה",
  "לאפה",
  "באגט",
  "לחם",
  "לחמניה",
  "חלה",
  "טורטייה",
  "ראפ",
  "קרואסון",
  "מאפה גבינה",
  "סושי",
  "רול סושי",
  "סושי סלמון",
  "סושי טונה",
  "סושי צמחוני",
  "ניגירי",
  "מאקי",
  "אינסייד אאוט",
  "קומבינציית סושי",
  "פוקי",
  "פוקי סלמון",
  "פוקי טונה",
  "אורז סושי",
  "אצות",
  "אדממה",
  "גיוזה",
  "מוקפץ",
  "מוקפץ עוף",
  "מוקפץ בקר",
  "מוקפץ ירקות",
  "נודלס",
  "פאד תאי",
  "ראמן",
  "אטריות",
  "אורז מוקפץ",
  "עוף חמוץ מתוק",
  "עוף טריאקי",
  "עוף בקארי",
  "קארי עוף",
  "עוף קארי עם אורז",
  "קארי ירוק",
  "קארי אדום",
  "קארי תאילנדי",
  "עוף במסאלה",
  "עוף טיקה",
  "צ׳יקן טיקה",
  "עוף חמאה",
  "אורז עם עוף",
  "עוף עם תפוחי אדמה",
  "פלאפל",
  "פלאפל בפיתה",
  "פלאפל בצלחת",
  "חומוס",
  "חומוס גרגירים",
  "חומוס פול",
  "טחינה",
  "סביח",
  "סלט",
  "סלט ירקות",
  "סלט יווני",
  "סלט טונה",
  "סלט עוף",
  "ירקות",
  "מלפפון",
  "עגבניה",
  "פלפל",
  "בצל",
  "חסה",
  "כרוב",
  "גזר",
  "ברוקולי",
  "כרובית",
  "שעועית ירוקה",
  "תירס",
  "אפונה",
  "אורז",
  "אורז לבן",
  "אורז מלא",
  "פתיתים",
  "קוסקוס",
  "בורגול",
  "קינואה",
  "פסטה",
  "פסטה פסטו",
  "פסטה עגבניות",
  "פסטה בולונז",
  "ספגטי בולונז",
  "בולונז",
  "רוטב בולונז",
  "פסטה שמנת",
  "פסטה אלפרדו",
  "פסטה רוזה",
  "פסטה טונה",
  "פסטה עוף",
  "לזניה",
  "רביולי",
  "ניוקי",
  "תפוח אדמה",
  "פירה",
  "צ׳יפס",
  "בטטה",
  "עדשים",
  "שעועית",
  "חומוס מבושל",
  "מרק",
  "מרק עוף",
  "מרק ירקות",
  "קוטג׳",
  "גבינה לבנה",
  "גבינה צהובה",
  "גבינה בולגרית",
  "פטה",
  "יוגורט",
  "יוגורט חלבון",
  "מעדן חלבון",
  "מילקי",
  "חלב",
  "שוקו",
  "סקי",
  "שמנת",
  "חמאה",
  "אבקת חלבון",
  "שייק חלבון",
  "קינדר בואנו",
  "קינדר שוקולד",
  "קינדר ג׳וי",
  "קינדר קאנטרי",
  "M&M",
  "M&M בוטנים",
  "M&M שוקולד",
  "סניקרס",
  "טוויקס",
  "מארס",
  "קיטקט",
  "אוראו",
  "נוטלה",
  "פסק זמן",
  "כיף כף",
  "קליק",
  "טורטית",
  "שוקולד",
  "שוקולד חלב",
  "שוקולד מריר",
  "קרמבו",
  "גלידה",
  "ארטיק",
  "מגנום",
  "קורנטו",
  "במבה",
  "במבה נוגט",
  "ביסלי",
  "דוריטוס",
  "תפוצ׳יפס",
  "פרינגלס",
  "בייגלה",
  "פופקורן",
  "גרעינים",
  "אגוזים",
  "שקדים",
  "קשיו",
  "חטיף חלבון",
  "גרנולה",
  "קורנפלקס",
  "חמאת בוטנים",
  "בננה",
  "תפוח",
  "תפוז",
  "ענבים",
  "אבטיח",
  "מלון",
  "תותים",
  "מנגו",
  "אננס",
  "אפרסק",
  "אגס",
  "תמרים",
  "צימוקים",
  "אבוקדו",
  "קפה",
  "נס קפה",
  "קפה שחור",
  "תה",
  "מיץ",
  "קולה",
  "זירו",
  "מים",
  "סודה"
];

// מאגר קלוריות ממוצע ל-100 גרם. הערכים הם אומדן כללי ולא תחליף לתווית מוצר/מסעדה.
// calories = קלוריות, protein/fat = גרמים ל-100 גרם.
const CALORIE_DATABASE = [
  // עוף, בשר ודגים
  { name: "חזה עוף", aliases: ["חזה עוף", "חזה עוף על האש", "עוף בגריל", "עוף מבושל"], calories: 165, protein: 31, fat: 3.6, category: "חלבון · עוף" },
  { name: "פרגית", aliases: ["פרגית", "פרגיות"], calories: 210, protein: 25, fat: 12, category: "חלבון · עוף" },
  { name: "שניצל", aliases: ["שניצל", "שניצלונים", "שניצל עוף"], calories: 285, protein: 18, fat: 14, category: "חלבון · מטוגן" },
  { name: "כרעיים עוף", aliases: ["כרעיים", "כרע עוף", "ירך עוף", "שוק עוף"], calories: 215, protein: 24, fat: 13, category: "חלבון · עוף" },
  { name: "כנפיים", aliases: ["כנפיים", "כנפי עוף"], calories: 290, protein: 24, fat: 20, category: "חלבון · עוף" },
  { name: "עוף בקארי", aliases: ["עוף בקארי", "קארי עוף", "עוף קארי", "קארי ירוק", "קארי אדום", "עוף במסאלה", "צ׳יקן טיקה", "עוף חמאה"], calories: 190, protein: 16, fat: 10, category: "מנה עיקרית · עוף ורוטב" },
  { name: "עוף טריאקי", aliases: ["עוף טריאקי", "טריאקי עוף"], calories: 180, protein: 19, fat: 7, category: "מנה עיקרית · עוף ורוטב" },
  { name: "עוף חמוץ מתוק", aliases: ["עוף חמוץ מתוק"], calories: 240, protein: 13, fat: 10, category: "מנה עיקרית · אסייתי" },
  { name: "בקר טחון", aliases: ["בשר טחון", "בקר טחון", "בשר בקר טחון"], calories: 254, protein: 26, fat: 17, category: "חלבון · בשר" },
  { name: "קציצות", aliases: ["קציצות", "כדורי בשר"], calories: 230, protein: 17, fat: 14, category: "חלבון · בשר" },
  { name: "קבב", aliases: ["קבב"], calories: 260, protein: 17, fat: 20, category: "חלבון · בשר" },
  { name: "סטייק", aliases: ["סטייק", "סינטה", "אנטריקוט", "בקר"], calories: 250, protein: 26, fat: 16, category: "חלבון · בשר" },
  { name: "אסאדו", aliases: ["אסאדו", "שורט ריב"], calories: 340, protein: 20, fat: 28, category: "חלבון · בשר שמן" },
  { name: "צלי בקר", aliases: ["צלי בקר", "גולאש"], calories: 210, protein: 22, fat: 12, category: "חלבון · בשר" },
  { name: "המבורגר", aliases: ["המבורגר", "בורגר", "צ׳יזבורגר"], calories: 295, protein: 16, fat: 18, category: "מנה עיקרית · בשר" },
  { name: "שווארמה", aliases: ["שווארמה", "שווארמה הודו", "שווארמה עוף", "שווארמה בצלחת"], calories: 260, protein: 22, fat: 17, category: "מנה עיקרית · בשר" },
  { name: "מעורב ירושלמי", aliases: ["מעורב ירושלמי", "מעורב"], calories: 230, protein: 22, fat: 14, category: "מנה עיקרית · בשר" },
  { name: "עראייס", aliases: ["עראייס", "ערייס"], calories: 300, protein: 14, fat: 18, category: "מנה עיקרית · בשר ומאפה" },
  { name: "טונה במים", aliases: ["טונה", "טונה במים"], calories: 116, protein: 26, fat: 1, category: "חלבון · דגים" },
  { name: "טונה בשמן", aliases: ["טונה בשמן"], calories: 198, protein: 29, fat: 8, category: "חלבון · דגים" },
  { name: "סלמון", aliases: ["סלמון", "דג סלמון"], calories: 208, protein: 20, fat: 13, category: "חלבון · דגים" },
  { name: "אמנון", aliases: ["אמנון", "מושט", "דג לבן"], calories: 128, protein: 26, fat: 3, category: "חלבון · דגים" },
  { name: "דניס", aliases: ["דניס"], calories: 150, protein: 22, fat: 6, category: "חלבון · דגים" },
  { name: "ביצה", aliases: ["ביצה", "ביצים", "ביצה קשה", "ביצה עין"], calories: 155, protein: 13, fat: 11, category: "חלבון · ביצים" },
  { name: "חביתה", aliases: ["חביתה", "מקושקשת"], calories: 190, protein: 12, fat: 15, category: "חלבון · ביצים" },
  { name: "שקשוקה", aliases: ["שקשוקה"], calories: 130, protein: 7, fat: 8, category: "מנה · ביצים" },

  // פחמימות ותוספות מבושלות
  { name: "אורז לבן מבושל", aliases: ["אורז", "אורז לבן", "אורז מבושל"], calories: 130, protein: 2.7, fat: 0.3, category: "פחמימה · תוספת" },
  { name: "אורז מלא מבושל", aliases: ["אורז מלא"], calories: 112, protein: 2.6, fat: 0.9, category: "פחמימה · תוספת" },
  { name: "אורז סושי", aliases: ["אורז סושי"], calories: 150, protein: 2.5, fat: 0.2, category: "פחמימה · סושי" },
  { name: "פסטה מבושלת", aliases: ["פסטה", "ספגטי", "מקרוני", "פסטה מבושלת"], calories: 158, protein: 5.8, fat: 0.9, category: "פחמימה · פסטה" },
  { name: "פסטה בולונז", aliases: ["בולונז", "פסטה בולונז", "ספגטי בולונז", "רוטב בולונז"], calories: 165, protein: 7, fat: 6, category: "מנה עיקרית · פסטה ובשר" },
  { name: "פסטה פסטו", aliases: ["פסטה פסטו"], calories: 230, protein: 6, fat: 11, category: "מנה · פסטה" },
  { name: "פסטה שמנת", aliases: ["פסטה שמנת", "פסטה אלפרדו", "פסטה רוזה"], calories: 250, protein: 7, fat: 14, category: "מנה · פסטה" },
  { name: "לזניה", aliases: ["לזניה"], calories: 165, protein: 9, fat: 8, category: "מנה · פסטה" },
  { name: "פתיתים מבושלים", aliases: ["פתיתים"], calories: 170, protein: 5, fat: 1.5, category: "פחמימה · תוספת" },
  { name: "קוסקוס מבושל", aliases: ["קוסקוס"], calories: 112, protein: 3.8, fat: 0.2, category: "פחמימה · תוספת" },
  { name: "בורגול מבושל", aliases: ["בורגול"], calories: 83, protein: 3.1, fat: 0.2, category: "פחמימה · תוספת" },
  { name: "קינואה מבושלת", aliases: ["קינואה"], calories: 120, protein: 4.4, fat: 1.9, category: "פחמימה · תוספת" },
  { name: "תפוח אדמה", aliases: ["תפוח אדמה", "תפוא", "תפוחי אדמה"], calories: 87, protein: 1.9, fat: 0.1, category: "פחמימה · ירק עמילני" },
  { name: "פירה", aliases: ["פירה"], calories: 110, protein: 2, fat: 4, category: "פחמימה · תוספת" },
  { name: "בטטה", aliases: ["בטטה"], calories: 86, protein: 1.6, fat: 0.1, category: "פחמימה · ירק עמילני" },
  { name: "צ׳יפס", aliases: ["ציפס", "צ׳יפס", "תפוחי אדמה מטוגנים"], calories: 312, protein: 3.4, fat: 15, category: "פחמימה · מטוגן" },
  { name: "נודלס", aliases: ["נודלס", "אטריות"], calories: 190, protein: 5, fat: 7, category: "פחמימה · אסייתי" },
  { name: "מוקפץ", aliases: ["מוקפץ", "מוקפץ עוף", "מוקפץ בקר", "מוקפץ ירקות"], calories: 170, protein: 8, fat: 6, category: "מנה עיקרית · אסייתי" },
  { name: "פאד תאי", aliases: ["פאד תאי", "פד תאי"], calories: 215, protein: 9, fat: 9, category: "מנה עיקרית · אסייתי" },
  { name: "ראמן", aliases: ["ראמן"], calories: 90, protein: 4, fat: 3, category: "מנה · מרק נודלס" },

  // לחמים ומאפים
  { name: "לחם לבן", aliases: ["לחם", "לחם לבן", "פרוסת לחם"], calories: 265, protein: 9, fat: 3.2, category: "פחמימה · לחם" },
  { name: "לחם מלא", aliases: ["לחם מלא"], calories: 247, protein: 13, fat: 4.2, category: "פחמימה · לחם" },
  { name: "פיתה", aliases: ["פיתה"], calories: 275, protein: 9, fat: 1.2, category: "פחמימה · לחם" },
  { name: "לאפה", aliases: ["לאפה"], calories: 290, protein: 8, fat: 4, category: "פחמימה · לחם" },
  { name: "באגט", aliases: ["באגט"], calories: 270, protein: 9, fat: 1.5, category: "פחמימה · לחם" },
  { name: "לחמניה", aliases: ["לחמניה", "לחמנייה"], calories: 270, protein: 8, fat: 4, category: "פחמימה · לחם" },
  { name: "טורטייה", aliases: ["טורטייה", "טורטיה", "ראפ"], calories: 310, protein: 8, fat: 8, category: "פחמימה · לחם" },
  { name: "חלה", aliases: ["חלה"], calories: 300, protein: 8, fat: 6, category: "פחמימה · לחם" },
  { name: "קרואסון", aliases: ["קרואסון"], calories: 406, protein: 8, fat: 21, category: "מאפה" },
  { name: "בורקס גבינה", aliases: ["בורקס", "בורקס גבינה"], calories: 330, protein: 9, fat: 20, category: "מאפה" },
  { name: "בורקס תפוח אדמה", aliases: ["בורקס תפוח אדמה", "בורקס תפו״א"], calories: 295, protein: 6, fat: 16, category: "מאפה" },
  { name: "מלאווח", aliases: ["מלאווח", "מלווח"], calories: 340, protein: 7, fat: 18, category: "מאפה" },
  { name: "ג׳חנון", aliases: ["ג׳חנון", "גחנון"], calories: 360, protein: 7, fat: 18, category: "מאפה" },
  { name: "פיצה", aliases: ["פיצה", "משולש פיצה", "פיצה מרגריטה", "פיצה פפרוני", "פיצה טונה", "פיצה פטריות", "פיצה זיתים", "פיצה אישית"], calories: 266, protein: 11, fat: 10, category: "מנה עיקרית · מאפה" },
  { name: "טוסט גבינה", aliases: ["טוסט", "טוסט גבינה"], calories: 285, protein: 12, fat: 13, category: "מנה · מאפה" },

  // ישראלי/רחוב/מנות נפוצות
  { name: "פלאפל", aliases: ["פלאפל", "כדור פלאפל", "פלאפל בצלחת"], calories: 333, protein: 13, fat: 18, category: "קטניות · מטוגן" },
  { name: "חומוס", aliases: ["חומוס", "חומוס גרגירים", "חומוס פול"], calories: 166, protein: 8, fat: 10, category: "קטניות · ממרח" },
  { name: "טחינה", aliases: ["טחינה"], calories: 595, protein: 17, fat: 53, category: "שומן · ממרח" },
  { name: "סביח", aliases: ["סביח"], calories: 230, protein: 7, fat: 12, category: "מנה · פיתה" },
  { name: "מרק עוף", aliases: ["מרק עוף"], calories: 45, protein: 4, fat: 2, category: "מרק" },
  { name: "מרק ירקות", aliases: ["מרק", "מרק ירקות"], calories: 35, protein: 1.5, fat: 1, category: "מרק" },

  // סושי ואסייתי
  { name: "סושי", aliases: ["סושי", "רול סושי", "אינסייד אאוט", "מאקי", "ניגירי", "קומבינציית סושי"], calories: 145, protein: 6, fat: 3, category: "מנה עיקרית · סושי" },
  { name: "סושי סלמון", aliases: ["סושי סלמון", "רול סלמון"], calories: 160, protein: 7, fat: 5, category: "מנה עיקרית · סושי" },
  { name: "סושי טמפורה", aliases: ["סושי טמפורה", "טמפורה"], calories: 230, protein: 6, fat: 10, category: "מנה עיקרית · סושי" },
  { name: "פוקי סלמון", aliases: ["פוקי", "פוקי סלמון", "פוקי טונה"], calories: 155, protein: 9, fat: 5, category: "מנה עיקרית · פוקי" },
  { name: "אדממה", aliases: ["אדממה"], calories: 121, protein: 11, fat: 5, category: "קטניות" },
  { name: "גיוזה", aliases: ["גיוזה"], calories: 230, protein: 9, fat: 10, category: "כיסונים" },

  // קטניות וירקות
  { name: "עדשים מבושלות", aliases: ["עדשים"], calories: 116, protein: 9, fat: 0.4, category: "קטניות" },
  { name: "שעועית מבושלת", aliases: ["שעועית", "שעועית לבנה", "שעועית אדומה"], calories: 127, protein: 8.7, fat: 0.5, category: "קטניות" },
  { name: "חומוס מבושל", aliases: ["חומוס מבושל", "גרגירי חומוס"], calories: 164, protein: 8.9, fat: 2.6, category: "קטניות" },
  { name: "סלט ירקות", aliases: ["סלט", "סלט ירקות", "ירקות"], calories: 25, protein: 1, fat: 0.2, category: "ירקות" },
  { name: "מלפפון", aliases: ["מלפפון"], calories: 15, protein: 0.7, fat: 0.1, category: "ירקות" },
  { name: "עגבניה", aliases: ["עגבניה", "עגבנייה"], calories: 18, protein: 0.9, fat: 0.2, category: "ירקות" },
  { name: "גזר", aliases: ["גזר"], calories: 41, protein: 0.9, fat: 0.2, category: "ירקות" },
  { name: "ברוקולי", aliases: ["ברוקולי"], calories: 35, protein: 2.4, fat: 0.4, category: "ירקות" },
  { name: "כרובית", aliases: ["כרובית"], calories: 25, protein: 1.9, fat: 0.3, category: "ירקות" },
  { name: "תירס", aliases: ["תירס"], calories: 96, protein: 3.4, fat: 1.5, category: "ירק עמילני" },
  { name: "אבוקדו", aliases: ["אבוקדו"], calories: 160, protein: 2, fat: 15, category: "שומן · פרי" },

  // חלב ומוצרים
  { name: "קוטג׳ 5%", aliases: ["קוטג", "קוטג׳", "קוטג 5", "קוטג׳ 5"], calories: 97, protein: 11, fat: 5, category: "חלבון · חלב" },
  { name: "גבינה לבנה 5%", aliases: ["גבינה לבנה", "גבינה לבנה 5"], calories: 95, protein: 9, fat: 5, category: "חלבון · חלב" },
  { name: "גבינה צהובה", aliases: ["גבינה צהובה"], calories: 350, protein: 25, fat: 27, category: "חלב · גבינה" },
  { name: "בולגרית/פטה", aliases: ["גבינה בולגרית", "בולגרית", "פטה"], calories: 265, protein: 14, fat: 21, category: "חלב · גבינה" },
  { name: "יוגורט טבעי", aliases: ["יוגורט", "יוגורט טבעי"], calories: 61, protein: 3.5, fat: 3.3, category: "חלב" },
  { name: "יוגורט חלבון", aliases: ["יוגורט חלבון", "מעדן חלבון", "פרו", "protein"], calories: 75, protein: 10, fat: 0.5, category: "חלבון · חלב" },
  { name: "מילקי", aliases: ["מילקי"], calories: 145, protein: 3, fat: 6, category: "מתוק · חלב" },
  { name: "חלב 3%", aliases: ["חלב", "חלב 3"], calories: 60, protein: 3.2, fat: 3, category: "שתייה · חלב" },
  { name: "שוקו", aliases: ["שוקו"], calories: 80, protein: 3.2, fat: 2, category: "שתייה · חלב" },
  { name: "חמאה", aliases: ["חמאה"], calories: 717, protein: 0.9, fat: 81, category: "שומן" },
  { name: "שמנת", aliases: ["שמנת"], calories: 200, protein: 3, fat: 20, category: "חלב · שומן" },
  { name: "אבקת חלבון", aliases: ["אבקת חלבון", "שייק חלבון"], calories: 390, protein: 78, fat: 6, category: "חלבון · אבקה" },

  // חטיפים ומתוקים
  { name: "שוקולד חלב", aliases: ["שוקולד", "שוקולד חלב"], calories: 535, protein: 7, fat: 30, category: "חטיף מתוק" },
  { name: "שוקולד מריר", aliases: ["שוקולד מריר"], calories: 600, protein: 8, fat: 43, category: "חטיף מתוק" },
  { name: "קינדר בואנו", aliases: ["קינדר בואנו", "bueno"], calories: 572, protein: 8.6, fat: 37, category: "חטיף מתוק" },
  { name: "קינדר שוקולד", aliases: ["קינדר שוקולד", "קינדר"], calories: 566, protein: 8.7, fat: 35, category: "חטיף מתוק" },
  { name: "קינדר ג׳וי", aliases: ["קינדר ג׳וי", "קינדר גוי"], calories: 560, protein: 7.5, fat: 35, category: "חטיף מתוק" },
  { name: "M&M", aliases: ["m&m", "M&M", "אמ אנד אמ", "אם אנד אם"], calories: 492, protein: 4.3, fat: 20, category: "חטיף מתוק" },
  { name: "M&M בוטנים", aliases: ["m&m בוטנים", "M&M בוטנים", "אמ אנד אמ בוטנים"], calories: 515, protein: 9.6, fat: 26, category: "חטיף מתוק" },
  { name: "סניקרס", aliases: ["סניקרס", "snickers"], calories: 488, protein: 8, fat: 24, category: "חטיף מתוק" },
  { name: "טוויקס", aliases: ["טוויקס", "twix"], calories: 502, protein: 4.9, fat: 24, category: "חטיף מתוק" },
  { name: "מארס", aliases: ["מארס", "mars"], calories: 449, protein: 4.4, fat: 17, category: "חטיף מתוק" },
  { name: "קיטקט", aliases: ["קיטקט", "kitkat"], calories: 518, protein: 6.5, fat: 26, category: "חטיף מתוק" },
  { name: "אוראו", aliases: ["אוראו", "oreo"], calories: 480, protein: 5, fat: 20, category: "עוגיות" },
  { name: "נוטלה", aliases: ["נוטלה", "nutella"], calories: 539, protein: 6.3, fat: 31, category: "ממרח מתוק" },
  { name: "פסק זמן", aliases: ["פסק זמן"], calories: 530, protein: 7, fat: 30, category: "חטיף מתוק" },
  { name: "כיף כף", aliases: ["כיף כף", "כיףכף"], calories: 515, protein: 7, fat: 28, category: "חטיף מתוק" },
  { name: "קליק", aliases: ["קליק"], calories: 520, protein: 7, fat: 29, category: "חטיף מתוק" },
  { name: "קרמבו", aliases: ["קרמבו"], calories: 340, protein: 3, fat: 10, category: "חטיף מתוק" },
  { name: "גלידה", aliases: ["גלידה", "ארטיק", "מגנום", "קורנטו"], calories: 207, protein: 3.5, fat: 11, category: "מתוק" },

  // חטיפים מלוחים ואגוזים
  { name: "במבה", aliases: ["במבה"], calories: 536, protein: 17, fat: 34, category: "חטיף מלוח" },
  { name: "במבה נוגט", aliases: ["במבה נוגט"], calories: 520, protein: 10, fat: 30, category: "חטיף מתוק" },
  { name: "ביסלי", aliases: ["ביסלי"], calories: 500, protein: 9, fat: 24, category: "חטיף מלוח" },
  { name: "דוריטוס", aliases: ["דוריטוס"], calories: 500, protein: 7, fat: 25, category: "חטיף מלוח" },
  { name: "תפוצ׳יפס", aliases: ["תפוציפס", "תפוצ׳יפס", "ציפס שקית"], calories: 536, protein: 7, fat: 35, category: "חטיף מלוח" },
  { name: "פרינגלס", aliases: ["פרינגלס"], calories: 536, protein: 6, fat: 34, category: "חטיף מלוח" },
  { name: "בייגלה", aliases: ["בייגלה", "ביגלה"], calories: 380, protein: 10, fat: 4, category: "חטיף מלוח" },
  { name: "פופקורן", aliases: ["פופקורן"], calories: 380, protein: 12, fat: 4, category: "חטיף" },
  { name: "גרעינים", aliases: ["גרעינים", "גרעיני חמניה"], calories: 584, protein: 21, fat: 51, category: "אגוזים וזרעים" },
  { name: "שקדים", aliases: ["שקדים"], calories: 579, protein: 21, fat: 50, category: "אגוזים" },
  { name: "קשיו", aliases: ["קשיו"], calories: 553, protein: 18, fat: 44, category: "אגוזים" },
  { name: "אגוזים", aliases: ["אגוזים", "אגוזי מלך"], calories: 654, protein: 15, fat: 65, category: "אגוזים" },
  { name: "חמאת בוטנים", aliases: ["חמאת בוטנים"], calories: 588, protein: 25, fat: 50, category: "ממרח" },
  { name: "חטיף חלבון", aliases: ["חטיף חלבון"], calories: 360, protein: 30, fat: 12, category: "חלבון · חטיף" },
  { name: "גרנולה", aliases: ["גרנולה"], calories: 471, protein: 10, fat: 20, category: "דגנים" },
  { name: "קורנפלקס", aliases: ["קורנפלקס", "דגני בוקר"], calories: 370, protein: 7, fat: 1.5, category: "דגנים" },

  // פירות
  { name: "בננה", aliases: ["בננה"], calories: 89, protein: 1.1, fat: 0.3, category: "פרי" },
  { name: "תפוח", aliases: ["תפוח", "תפוח עץ"], calories: 52, protein: 0.3, fat: 0.2, category: "פרי" },
  { name: "תפוז", aliases: ["תפוז"], calories: 47, protein: 0.9, fat: 0.1, category: "פרי" },
  { name: "ענבים", aliases: ["ענבים"], calories: 69, protein: 0.7, fat: 0.2, category: "פרי" },
  { name: "אבטיח", aliases: ["אבטיח"], calories: 30, protein: 0.6, fat: 0.2, category: "פרי" },
  { name: "מלון", aliases: ["מלון"], calories: 34, protein: 0.8, fat: 0.2, category: "פרי" },
  { name: "תותים", aliases: ["תותים", "תות"], calories: 32, protein: 0.7, fat: 0.3, category: "פרי" },
  { name: "מנגו", aliases: ["מנגו"], calories: 60, protein: 0.8, fat: 0.4, category: "פרי" },
  { name: "אננס", aliases: ["אננס"], calories: 50, protein: 0.5, fat: 0.1, category: "פרי" },
  { name: "אפרסק", aliases: ["אפרסק"], calories: 39, protein: 0.9, fat: 0.3, category: "פרי" },
  { name: "אגס", aliases: ["אגס"], calories: 57, protein: 0.4, fat: 0.1, category: "פרי" },
  { name: "תמר", aliases: ["תמר", "תמרים"], calories: 282, protein: 2.5, fat: 0.4, category: "פרי יבש" },
  { name: "צימוקים", aliases: ["צימוקים"], calories: 299, protein: 3.1, fat: 0.5, category: "פרי יבש" },

  // שתייה ורטבים
  { name: "קולה", aliases: ["קולה", "קוקה קולה"], calories: 42, protein: 0, fat: 0, category: "שתייה מתוקה" },
  { name: "קולה זירו", aliases: ["זירו", "קולה זירו"], calories: 0, protein: 0, fat: 0, category: "שתייה" },
  { name: "מיץ", aliases: ["מיץ", "מיץ תפוזים", "מיץ ענבים"], calories: 45, protein: 0.5, fat: 0.1, category: "שתייה מתוקה" },
  { name: "בירה", aliases: ["בירה"], calories: 43, protein: 0.5, fat: 0, category: "שתייה אלכוהולית" },
  { name: "שמן זית", aliases: ["שמן", "שמן זית"], calories: 884, protein: 0, fat: 100, category: "שומן" },
  { name: "מיונז", aliases: ["מיונז"], calories: 680, protein: 1, fat: 75, category: "רוטב" },
  { name: "קטשופ", aliases: ["קטשופ"], calories: 112, protein: 1.3, fat: 0.1, category: "רוטב" },
  { name: "רוטב צ׳ילי", aliases: ["רוטב צילי", "רוטב צ׳ילי", "צילי מתוק", "צ׳ילי מתוק"], calories: 220, protein: 0.5, fat: 0.5, category: "רוטב" },
];

const CALORIE_SUGGESTIONS = Array.from(new Set(CALORIE_DATABASE.flatMap((item) => [item.name, ...(item.aliases || [])])));

function getCalorieDatabaseMatch(name) {
  const cleanedName = cleanFoodName(name);
  const normalized = normalizeFoodText(cleanedName || name);
  if (!normalized) return null;
  const candidates = CALORIE_DATABASE.flatMap((item) =>
    [item.name, ...(item.aliases || [])].map((alias) => ({ item, alias, normalizedAlias: normalizeFoodText(alias) }))
  )
    .filter((row) => row.normalizedAlias && (normalized.includes(row.normalizedAlias) || row.normalizedAlias.includes(normalized)))
    .sort((a, b) => b.normalizedAlias.length - a.normalizedAlias.length);
  return candidates[0]?.item || null;
}

function calculateNutritionFromPer100(item, grams) {
  if (!item || !grams || grams <= 0) return null;
  const factor = grams / 100;
  return {
    calories: Math.round((Number(item.calories) || 0) * factor),
    protein: roundOne((Number(item.protein) || 0) * factor),
    fat: roundOne((Number(item.fat) || 0) * factor),
  };
}

function getAutoNutritionEstimate(rawName, gramsInput, savedFoods = []) {
  const grams = getFoodGrams(rawName, gramsInput);
  const savedMatch = getSavedFoodMatch(savedFoods, rawName);
  if (savedMatch && savedMatch.per100 && grams) {
    const values = calculateNutritionFromPer100(savedMatch.per100, grams);
    if (values) {
      return { ...values, grams, sourceName: savedMatch.name, category: savedMatch.category || "ספר מוצרים", note: `חושב לפי ${savedMatch.name} מספר המוצרים (${grams} גרם).` };
    }
  }

  const dbMatch = getCalorieDatabaseMatch(rawName);
  if (dbMatch && grams) {
    const values = calculateNutritionFromPer100(dbMatch, grams);
    return { ...values, grams, sourceName: dbMatch.name, category: dbMatch.category, note: `חושב לפי ממוצע ל-100 גרם: ${dbMatch.name}. אפשר לערוך לפני שמירה.` };
  }
  return null;
}

function buildAutoFoodFormPatch(rawName, gramsInput, savedFoods = []) {
  const raw = String(rawName || "").trim();
  const cleaned = cleanFoodName(raw) || raw;
  const grams = getFoodGrams(raw, gramsInput);
  if (!cleaned) return { autoNote: "" };

  const autoEstimate = getAutoNutritionEstimate(raw, gramsInput, savedFoods);
  if (autoEstimate) {
    return {
      grams: autoEstimate.grams ? String(autoEstimate.grams) : String(gramsInput || ""),
      calories: String(autoEstimate.calories ?? ""),
      protein: String(autoEstimate.protein ?? ""),
      fat: String(autoEstimate.fat ?? ""),
      autoNote: autoEstimate.note,
    };
  }

  const savedMatch = getSavedFoodMatch(savedFoods, raw);
  if (savedMatch) {
    if (hasFoodNutrition(savedMatch)) {
      return {
        calories: String(savedMatch.calories ?? ""),
        protein: String(savedMatch.protein ?? ""),
        fat: String(savedMatch.fat ?? ""),
        autoNote: `זוהה מוצר שמור בספר: ${savedMatch.name}. הפרטים מולאו אוטומטית, ואפשר לערוך לפני שמירה.`,
      };
    }
    return { autoNote: `זוהה מוצר שמור בספר: ${savedMatch.name}. חסרים לו ערכים, אפשר לעדכן אותו בספר המוצרים.` };
  }

  const calorieDbMatch = getCalorieDatabaseMatch(raw);
  if (calorieDbMatch) {
    return { autoNote: `זוהה במאגר הקלוריות: ${calorieDbMatch.name}. כתוב כמה גרם כדי שאחשב אוטומטית קלוריות, חלבון ושומן.` };
  }

  const profileMatch = getFoodProfileMatch(raw);
  if (profileMatch) {
    return { autoNote: `זוהה: ${profileMatch.name} · ${profileMatch.category}. אין חישוב מספרי למאכל הזה כרגע; אפשר להזין ידנית או לשמור בספר מוצרים.` };
  }

  const suggestionMatch = getFoodSuggestionMatch(raw);
  if (suggestionMatch) {
    return { autoNote: `זוהה מאכל מהרשימה: ${suggestionMatch}. אם אין חישוב אוטומטי, הזן ידנית פעם אחת ושמור בספר מוצרים.` };
  }

  return { autoNote: "מאכל לא מוכר במאגר. אפשר להזין ידנית ולשמור בספר מוצרים לפעם הבאה." };
}


const COMMON_FOOD_PROFILES = [
  { name: "שווארמה", aliases: ["שווארמה", "שווארמה בפיתה", "שווארמה בלאפה", "שווארמה בצלחת", "שווארמה בבאגט"], category: "מנה עיקרית · בשר", portionHint: "פיתה / לאפה / צלחת / גרמים", tip: "כדאי לרשום גם רטבים, צ׳יפס ותוספות אם היו." },
  { name: "פיצה", aliases: ["פיצה", "משולש פיצה", "פיצה משפחתית", "פיצה אישית", "פיצה מרגריטה", "פיצה פפרוני", "פיצה טונה", "פיצה פטריות", "פיצה זיתים"], category: "מנה עיקרית · מאפה", portionHint: "מספר משולשים / פיצה אישית", tip: "תוספות וגבינה כפולה משנות את הערך התזונתי." },
  { name: "סושי", aliases: ["סושי", "רול סושי", "סושי סלמון", "סושי טונה", "סושי צמחוני", "ניגירי", "מאקי", "אינסייד אאוט", "קומבינציית סושי"], category: "מנה עיקרית · דגים/אורז", portionHint: "רולים / יחידות / קומבינציה", tip: "רוטבים, טמפורה ומיונז משנים מאוד." },
  { name: "בולונז", aliases: ["בולונז", "פסטה בולונז", "ספגטי בולונז", "רוטב בולונז"], category: "מנה עיקרית · פסטה ובשר", portionHint: "צלחת / גרמים / קופסה", tip: "אפשר לרשום בנפרד אם זו מנה עם הרבה רוטב או גבינה." },
  { name: "עוף בקארי", aliases: ["עוף בקארי", "קארי עוף", "עוף קארי", "עוף קארי עם אורז", "קארי ירוק", "קארי אדום", "קארי תאילנדי", "עוף במסאלה", "עוף טיקה", "צ׳יקן טיקה", "עוף חמאה"], category: "מנה עיקרית · עוף ורוטב", portionHint: "צלחת / גרמים / עם אורז", tip: "רוטב קוקוס/שמנת ואורז בצד משנים את המנה." },
  { name: "המבורגר", aliases: ["המבורגר", "צ׳יזבורגר", "בורגר", "המבורגר כפול"], category: "מנה עיקרית · בשר", portionHint: "יחידה / כפול / עם צ׳יפס", tip: "כדאי לציין רטבים, גבינה וצ׳יפס אם היו." },
  { name: "פלאפל", aliases: ["פלאפל", "פלאפל בפיתה", "פלאפל בצלחת"], category: "מנה עיקרית · קטניות", portionHint: "פיתה / צלחת / כדורים", tip: "טחינה, צ׳יפס וסלטים יכולים לשנות את המנה." },
  { name: "שניצל", aliases: ["שניצל", "שניצלונים", "שניצל בבאגט", "שניצל בפיתה"], category: "מנה עיקרית · עוף", portionHint: "יחידות / גרמים / בבאגט", tip: "לחם, רטבים ותוספת בצד חשובים לרישום מדויק יותר." },
  { name: "חזה עוף", aliases: ["חזה עוף", "חזה עוף על האש", "עוף", "פרגית", "פרגית בפיתה", "פרגית בלאפה"], category: "חלבון · עוף", portionHint: "גרמים / חתיכות / מנה", tip: "שיטת בישול, שמן ורוטב יכולים לשנות." },
  { name: "סטייק", aliases: ["סטייק", "אנטריקוט", "סינטה", "אסאדו", "צלי בקר", "בקר", "בשר טחון", "כדורי בשר", "קציצות", "גולאש"], category: "חלבון · בשר", portionHint: "גרמים / חתיכות / מנה", tip: "אחוז שומן ורוטב משפיעים מאוד." },
  { name: "טונה", aliases: ["טונה", "סלט טונה", "טונה במים", "טונה בשמן"], category: "חלבון · דגים", portionHint: "קופסה / גרמים / סלט", tip: "כדאי לציין מים/שמן ותוספות." },
  { name: "סלמון", aliases: ["סלמון", "דג סלמון", "דג", "אמנון", "דג לבן", "דניס", "נסיכת הנילוס"], category: "חלבון · דגים", portionHint: "פילה / גרמים / מנה", tip: "אופן הכנה ורוטב משנים." },
  { name: "ביצים", aliases: ["ביצה", "ביצים", "חביתה", "מקושקשת", "שקשוקה"], category: "חלבון · ביצים", portionHint: "מספר ביצים / מנה", tip: "שמן, גבינה ולחם ליד משנים את הרישום." },
  { name: "מוקפץ", aliases: ["מוקפץ", "מוקפץ עוף", "מוקפץ בקר", "מוקפץ ירקות", "נודלס", "פאד תאי", "אורז מוקפץ", "עוף טריאקי", "עוף חמוץ מתוק"], category: "מנה עיקרית · אסייתי", portionHint: "צלחת / קופסה / גרמים", tip: "רוטב, שמן וכמות נודלס/אורז משנים מאוד." },
  { name: "פסטה", aliases: ["פסטה", "פסטה פסטו", "פסטה עגבניות", "פסטה שמנת", "פסטה אלפרדו", "פסטה רוזה", "פסטה טונה", "פסטה עוף", "לזניה", "רביולי", "ניוקי"], category: "פחמימה · פסטה", portionHint: "צלחת / גרמים / קופסה", tip: "רוטב שמנת/גבינה/שמן משנה את המנה." },
  { name: "אורז", aliases: ["אורז", "אורז לבן", "אורז מלא", "אורז עם עוף", "אורז סושי"], category: "פחמימה · תוספת", portionHint: "כפות / כוס / גרמים", tip: "כדאי לציין אם זו תוספת או חלק ממנה." },
  { name: "פתיתים וקוסקוס", aliases: ["פתיתים", "קוסקוס", "בורגול", "קינואה"], category: "פחמימה · תוספת", portionHint: "כוס / כפות / גרמים", tip: "רוטב/שמן יכול לשנות." },
  { name: "לחם ומאפים", aliases: ["פיתה", "לאפה", "באגט", "לחם", "לחמניה", "חלה", "טורטייה", "ראפ", "פוקאצ׳ה", "בורקס", "בורקס גבינה", "בורקס תפוח אדמה", "מלאווח", "ג׳חנון", "קרואסון", "מאפה גבינה"], category: "פחמימה · מאפה", portionHint: "יחידה / פרוסות / חצי מנה", tip: "מילוי ותוספות חשובים." },
  { name: "חומוס וטחינה", aliases: ["חומוס", "חומוס גרגירים", "חומוס פול", "טחינה", "סביח"], category: "מנה/תוספת · קטניות ושומן", portionHint: "צלחת / כפות / פיתה", tip: "שמן, ביצה ופיתה ליד משנים." },
  { name: "סלט", aliases: ["סלט", "סלט ירקות", "סלט יווני", "סלט עוף", "ירקות", "מלפפון", "עגבניה", "פלפל", "חסה", "כרוב", "גזר", "ברוקולי", "כרובית", "שעועית ירוקה"], category: "ירקות", portionHint: "קערה / צלחת / גרמים", tip: "רוטב, שמן, גבינות וקרוטונים משנים." },
  { name: "מוצרי חלב", aliases: ["קוטג׳", "גבינה לבנה", "גבינה צהובה", "גבינה בולגרית", "פטה", "יוגורט", "יוגורט חלבון", "מעדן חלבון", "מילקי", "חלב", "שוקו", "סקי", "שמנת"], category: "חלבון/חלב", portionHint: "גביע / פרוסות / גרמים", tip: "אחוז שומן וגודל גביע חשובים." },
  { name: "אבקת חלבון", aliases: ["אבקת חלבון", "שייק חלבון", "משקה חלבון", "חטיף חלבון"], category: "חלבון · מוצר", portionHint: "סקופים / יחידה / בקבוק", tip: "במוצרים כאלה הכי טוב לשמור פעם אחת בספר מוצרים." },
  { name: "שוקולדים וחטיפים מתוקים", aliases: ["קינדר בואנו", "קינדר שוקולד", "קינדר ג׳וי", "קינדר קאנטרי", "M&M", "M&M בוטנים", "M&M שוקולד", "סניקרס", "טוויקס", "מארס", "קיטקט", "אוראו", "נוטלה", "פסק זמן", "כיף כף", "קליק", "טורטית", "שוקולד", "שוקולד חלב", "שוקולד מריר", "קרמבו"], category: "חטיף מתוק", portionHint: "יחידה / חטיף / גרמים / חופן", tip: "במוצרים ארוזים כדאי לשמור את הערכים מהאריזה בספר מוצרים." },
  { name: "חטיפים מלוחים", aliases: ["במבה", "במבה נוגט", "ביסלי", "דוריטוס", "תפוצ׳יפס", "פרינגלס", "בייגלה", "פופקורן", "גרעינים"], category: "חטיף מלוח", portionHint: "שקית / חופן / גרמים", tip: "גודל שקית משתנה מאוד." },
  { name: "אגוזים", aliases: ["אגוזים", "שקדים", "קשיו", "חמאת בוטנים"], category: "שומן · נשנוש", portionHint: "חופן / כפות / גרמים", tip: "כמות קטנה יכולה להיות משמעותית, אז כדאי לרשום כמות." },
  { name: "פירות", aliases: ["בננה", "תפוח", "תפוז", "ענבים", "אבטיח", "מלון", "תותים", "מנגו", "אננס", "אפרסק", "אגס", "תמרים", "צימוקים", "אבוקדו"], category: "פרי", portionHint: "יחידה / פרוסות / חופן / גרמים", tip: "פירות יבשים ואבוקדו שונים מפירות רגילים." },
  { name: "שתייה", aliases: ["קפה", "נס קפה", "קפה שחור", "תה", "מיץ", "קולה", "זירו", "מים", "סודה"], category: "שתייה", portionHint: "כוס / בקבוק / פחית", tip: "שתייה מתוקה כדאי לרשום בנפרד מהמים." },
];

function getFoodProfileMatch(name) {
  const cleanedName = cleanFoodName(name);
  const normalized = normalizeFoodText(cleanedName || name);
  if (!normalized) return null;
  return COMMON_FOOD_PROFILES.find((profile) =>
    profile.aliases.some((alias) => {
      const normAlias = normalizeFoodText(alias);
      return normAlias && (normalized.includes(normAlias) || normAlias.includes(normalized));
    })
  ) || null;
}

function getFoodProfileLabel(entry) {
  if (!entry) return "";
  return entry.category || entry.profileName || "";
}

function getTaskStatus(task) {
  return task.status || (task.done ? "done" : "not_done");
}

function isTaskDone(task) {
  return getTaskStatus(task) === "done";
}

function getTaskPriority(task) {
  return task.priority || "normal";
}

function normalizeFoodText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[״"']/g, "")
    .replace(/[׳`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function numberFromInput(value) {
  const num = parseFloat(String(value || "").replace(",", "."));
  return Number.isFinite(num) ? num : null;
}

function extractGramsFromName(name) {
  const match = String(name || "").match(/(\d+(?:[.,]\d+)?)\s*(גרם|גר׳|גר|ג׳|ג'|g)/i);
  return match ? numberFromInput(match[1]) : null;
}

function cleanFoodName(name) {
  return String(name || "")
    .replace(/(\d+(?:[.,]\d+)?)\s*(גרם|גר׳|גר|ג׳|ג'|g)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getFoodGrams(name, gramsInput) {
  return numberFromInput(gramsInput) || extractGramsFromName(name);
}

function roundOne(num) {
  return Math.round(num * 10) / 10;
}

function hasFoodNutrition(food) {
  return food && food.hasNutrition !== false && (
    Number.isFinite(Number(food.calories)) ||
    Number.isFinite(Number(food.protein)) ||
    Number.isFinite(Number(food.fat))
  );
}

function formatFoodNutrition(food) {
  if (!hasFoodNutrition(food)) return "נשמר ללא פרטים מספריים";
  const calories = Number(food.calories) || 0;
  const protein = Number(food.protein) || 0;
  const fat = Number(food.fat) || 0;
  return `${calories} קל׳ · ${protein} ג חלבון · ${fat} ג שומן`;
}


function getFoodSuggestionMatch(name) {
  const cleanedName = cleanFoodName(name);
  const normalized = normalizeFoodText(cleanedName || name);
  if (!normalized) return null;
  return FOOD_SUGGESTIONS.find((item) => normalized.includes(normalizeFoodText(item))) || null;
}

function getSavedFoodMatch(savedFoods, name) {
  const cleanedName = cleanFoodName(name);
  const normalized = normalizeFoodText(cleanedName || name);
  if (!normalized) return null;
  return savedFoods.find((item) => {
    const productName = normalizeFoodText(item.name);
    return productName && (normalized.includes(productName) || productName.includes(normalized));
  }) || null;
}

function getDateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatHebrewDate(d = new Date()) {
  const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  return `${days[d.getDay()]}, ${d.getDate()} ב${months[d.getMonth()]}`;
}

function formatShortDate(dateStr) {
  // dateStr: YYYY-MM-DD
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}`;
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

async function loadKey(key, fallback) {
  try {
    const res = await window.storage.get(key, false);
    if (res && res.value) return JSON.parse(res.value);
    return fallback;
  } catch (e) {
    return fallback;
  }
}

async function saveKey(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value), false);
  } catch (e) {
    console.error("שמירה נכשלה", e);
  }
}


async function addDateToHistory(date) {
  const dates = await loadKey("dailyHistoryDates", []);
  if (!dates.includes(date)) {
    const next = [...dates, date].sort((a, b) => b.localeCompare(a));
    await saveKey("dailyHistoryDates", next);
    return next;
  }
  return dates;
}

async function loadHistoryRows(dates) {
  const rows = await Promise.all(
    dates.map(async (date) => {
      const food = await loadKey(`food:${date}`, []);
      const water = await loadKey(`water:${date}`, []);
      const totals = food.reduce(
        (acc, f) => ({
          calories: acc.calories + (Number(f.calories) || 0),
          protein: acc.protein + (Number(f.protein) || 0),
          fat: acc.fat + (Number(f.fat) || 0),
        }),
        { calories: 0, protein: 0, fat: 0 }
      );
      const totalWater = water.reduce((sum, w) => sum + (Number(w.amount) || 0), 0);
      return { date, food, water, totals, totalWater };
    })
  );
  return rows.filter((row) => row.food.length > 0 || row.water.length > 0);
}

export default function DayBoard() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("tasks");
  const [dateKey, setDateKey] = useState(getDateKey());

  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("normal");
  const [taskFilter, setTaskFilter] = useState("open");
  const [showDueFields, setShowDueFields] = useState(false);
  const [dueDateInput, setDueDateInput] = useState("");
  const [dueTimeInput, setDueTimeInput] = useState("");

  const [foodEntries, setFoodEntries] = useState([]);
  const [foodForm, setFoodForm] = useState({ name: "", grams: "", calories: "", protein: "", fat: "", autoNote: "" });
  const [savedFoods, setSavedFoods] = useState([]);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [libraryForm, setLibraryForm] = useState({ name: "", grams: "100", calories: "", protein: "", fat: "" });

  const [waterEntries, setWaterEntries] = useState([]);
  const [customWater, setCustomWater] = useState("");

  const [historyRows, setHistoryRows] = useState([]);

  const [weightEntries, setWeightEntries] = useState([]);
  const [weightDate, setWeightDate] = useState(getDateKey());
  const [weightValue, setWeightValue] = useState("");

  const dateKeyRef = useRef(dateKey);
  dateKeyRef.current = dateKey;

  useEffect(() => {
    setFoodForm((prev) => {
      const patch = buildAutoFoodFormPatch(prev.name, prev.grams, savedFoods);
      const extractedGrams = extractGramsFromName(prev.name);
      const next = {
        ...prev,
        ...patch,
        grams: patch.grams || prev.grams || (extractedGrams ? String(extractedGrams) : prev.grams),
      };
      return JSON.stringify(next) === JSON.stringify(prev) ? prev : next;
    });
  }, [foodForm.name, foodForm.grams, savedFoods]);

  // initial load
  useEffect(() => {
    (async () => {
      const t = await loadKey("tasks", []);
      const f = await loadKey(`food:${dateKey}`, []);
      const w = await loadKey(`water:${dateKey}`, []);
      const wt = await loadKey("weight", []);
      const lib = await loadKey("foodLibrary", []);
      let histDates = await loadKey("dailyHistoryDates", []);
      if ((f.length > 0 || w.length > 0) && !histDates.includes(dateKey)) {
        histDates = await addDateToHistory(dateKey);
      }
      const hist = await loadHistoryRows(histDates);
      setTasks(t);
      setFoodEntries(f);
      setWaterEntries(w);
      setWeightEntries(wt);
      setSavedFoods(lib);
      setHistoryRows(hist);
      setReady(true);
    })();
  }, []);

  const refreshHistory = useCallback(async () => {
    const dates = await loadKey("dailyHistoryDates", []);
    const rows = await loadHistoryRows(dates);
    setHistoryRows(rows);
  }, []);

  // midnight rollover check
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = getDateKey();
      if (now !== dateKeyRef.current) {
        setDateKey(now);
        const f = await loadKey(`food:${now}`, []);
        const w = await loadKey(`water:${now}`, []);
        setFoodEntries(f);
        setWaterEntries(w);
        await refreshHistory();
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [refreshHistory]);

  // ---- tasks ----
  const persistTasks = useCallback(async (next) => {
    setTasks(next);
    await saveKey("tasks", next);
  }, []);

  const addTask = () => {
    const text = newTaskText.trim();
    if (!text) return;
    const due = dueDateInput ? { date: dueDateInput, time: dueTimeInput || null } : null;
    const next = [...tasks, { id: uid(), text, status: "not_done", statusText: "", priority: newTaskPriority, done: false, createdAt: Date.now(), due }];
    persistTasks(next);
    setNewTaskText("");
    setDueDateInput("");
    setDueTimeInput("");
    setShowDueFields(false);
  };

  const toggleTask = (id) => {
    const next = tasks.map((t) => {
      if (t.id !== id) return t;
      const nextStatus = isTaskDone(t) ? "not_done" : "done";
      return { ...t, status: nextStatus, done: nextStatus === "done" };
    });
    persistTasks(next);
  };

  const updateTaskStatus = (id, status) => {
    const next = tasks.map((t) => (t.id === id ? { ...t, status, done: status === "done" } : t));
    persistTasks(next);
  };

  const updateTaskStatusText = (id, statusText) => {
    const next = tasks.map((t) => (t.id === id ? { ...t, statusText } : t));
    persistTasks(next);
  };

  const updateTaskPriority = (id, priority) => {
    const next = tasks.map((t) => (t.id === id ? { ...t, priority } : t));
    persistTasks(next);
  };

  const deleteTask = (id) => {
    persistTasks(tasks.filter((t) => t.id !== id));
  };

  const clearDoneTasks = () => {
    persistTasks(tasks.filter((t) => !isTaskDone(t)));
  };

  // ---- food ----
  const persistFood = useCallback(async (next) => {
    const currentDate = dateKeyRef.current;
    setFoodEntries(next);
    await saveKey(`food:${currentDate}`, next);
    if (next.length > 0) await addDateToHistory(currentDate);
    await refreshHistory();
  }, [refreshHistory]);

  const resetFoodForm = () => {
    setFoodForm({ name: "", grams: "", calories: "", protein: "", fat: "", autoNote: "" });
  };

  const applyAutoFoodEstimate = () => {
    setFoodForm((prev) => {
      const patch = buildAutoFoodFormPatch(prev.name, prev.grams, savedFoods);
      const next = { ...prev, ...patch };
      return JSON.stringify(next) === JSON.stringify(prev) ? prev : next;
    });
  };

  const addFood = (mode = "detailed") => {
    const rawName = foodForm.name.trim();
    const name = cleanFoodName(rawName) || rawName;
    const grams = getFoodGrams(rawName, foodForm.grams);
    const profile = getFoodProfileMatch(name);
    if (!name) return;

    const autoEstimate = getAutoNutritionEstimate(rawName, foodForm.grams, savedFoods);
    const manualCalories = parseFloat(foodForm.calories);
    const manualProtein = parseFloat(foodForm.protein);
    const manualFat = parseFloat(foodForm.fat);
    const calories = Number.isFinite(manualCalories) ? manualCalories : autoEstimate?.calories;
    const protein = Number.isFinite(manualProtein) ? manualProtein : autoEstimate?.protein;
    const fat = Number.isFinite(manualFat) ? manualFat : autoEstimate?.fat;
    const hasDetails = Number.isFinite(calories) || Number.isFinite(protein) || Number.isFinite(fat);

    if (mode === "detailed" && !hasDetails) return;

    const entry = {
      id: uid(),
      name,
      grams: grams || autoEstimate?.grams || null,
      profileName: profile?.name || autoEstimate?.sourceName || null,
      category: autoEstimate?.category || profile?.category || null,
      portionHint: profile?.portionHint || null,
      hasNutrition: hasDetails,
      calories: hasDetails && Number.isFinite(calories) ? Math.round(calories) : null,
      protein: hasDetails && Number.isFinite(protein) ? roundOne(protein) : null,
      fat: hasDetails && Number.isFinite(fat) ? roundOne(fat) : null,
      estimateNote: hasDetails ? (autoEstimate?.note || foodForm.autoNote || null) : "נשמר בלי קלוריות/מאקרו",
      time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
    };
    persistFood([...foodEntries, entry]);
    resetFoodForm();
  };

  const deleteFood = (id) => {
    persistFood(foodEntries.filter((f) => f.id !== id));
  };

  // ---- food product library ----
  const persistLibrary = useCallback(async (next) => {
    setSavedFoods(next);
    await saveKey("foodLibrary", next);
  }, []);

  const addProductToLibrary = () => {
    const name = libraryForm.name.trim();
    if (!name) return;
    const calories = parseFloat(libraryForm.calories);
    const protein = parseFloat(libraryForm.protein);
    const fat = parseFloat(libraryForm.fat);
    const grams = numberFromInput(libraryForm.grams) || 100;
    const hasDetails = Number.isFinite(calories) || Number.isFinite(protein) || Number.isFinite(fat);
    const per100 = hasDetails ? {
      calories: Number.isFinite(calories) ? Math.round((calories / grams) * 100) : 0,
      protein: Number.isFinite(protein) ? roundOne((protein / grams) * 100) : 0,
      fat: Number.isFinite(fat) ? roundOne((fat / grams) * 100) : 0,
    } : null;
    const product = {
      id: uid(),
      name,
      grams,
      per100,
      hasNutrition: hasDetails,
      calories: hasDetails && Number.isFinite(calories) ? Math.round(calories) : null,
      protein: hasDetails && Number.isFinite(protein) ? roundOne(protein) : null,
      fat: hasDetails && Number.isFinite(fat) ? roundOne(fat) : null,
    };
    persistLibrary([...savedFoods, product]);
    setLibraryForm({ name: "", grams: "100", calories: "", protein: "", fat: "" });
    setShowLibraryForm(false);
  };

  const deleteProductFromLibrary = (id) => {
    persistLibrary(savedFoods.filter((p) => p.id !== id));
  };

  const logProductFromLibrary = (product) => {
    const hasDetails = hasFoodNutrition(product);
    const profile = getFoodProfileMatch(product.name);
    const entry = {
      id: uid(),
      name: product.name,
      profileName: profile?.name || null,
      category: profile?.category || null,
      portionHint: profile?.portionHint || null,
      hasNutrition: hasDetails,
      calories: hasDetails ? product.calories : null,
      protein: hasDetails ? product.protein : null,
      fat: hasDetails ? product.fat : null,
      estimateNote: hasDetails ? "נוסף מספר המוצרים" : "נשמר בלי קלוריות/מאקרו",
      time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
    };
    persistFood([...foodEntries, entry]);
  };

  const foodTotals = foodEntries.reduce(
    (acc, f) => ({
      calories: acc.calories + (Number(f.calories) || 0),
      protein: acc.protein + (Number(f.protein) || 0),
      fat: acc.fat + (Number(f.fat) || 0),
    }),
    { calories: 0, protein: 0, fat: 0 }
  );

  // ---- water ----
  const persistWater = useCallback(async (next) => {
    const currentDate = dateKeyRef.current;
    setWaterEntries(next);
    await saveKey(`water:${currentDate}`, next);
    if (next.length > 0) await addDateToHistory(currentDate);
    await refreshHistory();
  }, [refreshHistory]);

  const addWater = (amount) => {
    if (!amount || amount <= 0) return;
    const entry = { id: uid(), amount, time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }) };
    persistWater([...waterEntries, entry]);
  };

  const removeWaterEntry = (id) => {
    persistWater(waterEntries.filter((w) => w.id !== id));
  };

  const totalWater = waterEntries.reduce((sum, w) => sum + w.amount, 0);
  const waterPct = Math.min(100, Math.round((totalWater / WATER_GOAL) * 100));
  const waterGoalReached = totalWater >= WATER_GOAL;

  // ---- weight ----
  const persistWeight = useCallback(async (next) => {
    setWeightEntries(next);
    await saveKey("weight", next);
  }, []);

  const saveWeight = () => {
    const val = parseFloat(weightValue);
    if (!weightDate || isNaN(val) || val <= 0) return;
    const existingIdx = weightEntries.findIndex((w) => w.date === weightDate);
    let next;
    if (existingIdx >= 0) {
      next = weightEntries.map((w, i) => (i === existingIdx ? { ...w, weight: val } : w));
    } else {
      next = [...weightEntries, { id: uid(), date: weightDate, weight: val }];
    }
    persistWeight(next);
    setWeightValue("");
  };

  const deleteWeight = (id) => {
    persistWeight(weightEntries.filter((w) => w.id !== id));
  };

  if (!ready) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center"
        style={{ background: palette.bg, fontFamily: "Rubik, sans-serif" }}
      >
        <p style={{ color: palette.mutedInk }}>טוען...</p>
      </div>
    );
  }

  const tabMeta = {
    tasks: { label: "משימות", icon: ListTodo, accent: palette.tasksAccent },
    food: { label: "תזונה", icon: Utensils, accent: palette.foodAccent },
    water: { label: "מים", icon: Droplets, accent: palette.waterAccent },
    weight: { label: "משקל", icon: Scale, accent: palette.weightAccent },
    history: { label: "היסטוריה", icon: History, accent: palette.ink },
  };

  const openTasksCount = tasks.filter((t) => !isTaskDone(t)).length;
  const todayCalories = Math.round(foodTotals.calories || 0);
  const waterLiters = (totalWater / 1000).toFixed(1);
  const currentTabAccent = tabMeta[tab]?.accent || palette.ink;

  return (
    <div dir="rtl" className="min-h-screen pb-24 app-shell" style={{ background: palette.bg, fontFamily: "Rubik, sans-serif", color: palette.ink, "--active-accent": currentTabAccent }}>
      <div className="bg-blob bg-blob-a" />
      <div className="bg-blob bg-blob-b" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Rubik:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Frank Ruhl Libre', serif; }
        @keyframes ripple { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ripple { animation: ripple 7s linear infinite; }
        input::placeholder { color: #B7AE9C; }
      `}</style>

      {/* header */}
      <header className="px-5 pt-6 pb-4 max-w-xl mx-auto app-header">
        <div className="hero-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm hero-date">{formatHebrewDate()}</p>
              <h1 className="font-display text-3xl mt-1 hero-title">לוח-יום</h1>
            </div>
            <div className="hero-pill">
              <span className="hero-dot" />
              היום
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span>{openTasksCount}</span>
              <small>משימות פתוחות</small>
            </div>
            <div className="hero-stat">
              <span>{todayCalories}</span>
              <small>קלוריות היום</small>
            </div>
            <div className="hero-stat">
              <span>{waterLiters} ל׳</span>
              <small>מים</small>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 max-w-xl mx-auto app-main">
        {tab === "tasks" && (
          <TasksView
            tasks={tasks}
            newTaskText={newTaskText}
            setNewTaskText={setNewTaskText}
            newTaskPriority={newTaskPriority}
            setNewTaskPriority={setNewTaskPriority}
            taskFilter={taskFilter}
            setTaskFilter={setTaskFilter}
            addTask={addTask}
            toggleTask={toggleTask}
            updateTaskStatus={updateTaskStatus}
            updateTaskStatusText={updateTaskStatusText}
            updateTaskPriority={updateTaskPriority}
            deleteTask={deleteTask}
            clearDoneTasks={clearDoneTasks}
            showDueFields={showDueFields}
            setShowDueFields={setShowDueFields}
            dueDateInput={dueDateInput}
            setDueDateInput={setDueDateInput}
            dueTimeInput={dueTimeInput}
            setDueTimeInput={setDueTimeInput}
          />
        )}

        {tab === "food" && (
          <FoodView
            foodForm={foodForm}
            setFoodForm={setFoodForm}
            applyAutoFoodEstimate={applyAutoFoodEstimate}
            addFood={addFood}
            foodEntries={foodEntries}
            deleteFood={deleteFood}
            totals={foodTotals}
            savedFoods={savedFoods}
            showLibraryModal={showLibraryModal}
            setShowLibraryModal={setShowLibraryModal}
          />
        )}

        {tab === "water" && (
          <WaterView
            totalWater={totalWater}
            waterPct={waterPct}
            waterGoalReached={waterGoalReached}
            addWater={addWater}
            customWater={customWater}
            setCustomWater={setCustomWater}
            waterEntries={waterEntries}
            removeWaterEntry={removeWaterEntry}
          />
        )}

        {tab === "weight" && (
          <WeightView
            weightEntries={weightEntries}
            weightDate={weightDate}
            setWeightDate={setWeightDate}
            weightValue={weightValue}
            setWeightValue={setWeightValue}
            saveWeight={saveWeight}
            deleteWeight={deleteWeight}
          />
        )}

        {tab === "history" && (
          <HistoryView historyRows={historyRows} />
        )}
      </main>

      {showLibraryModal && (
        <ProductLibraryModal
          savedFoods={savedFoods}
          showLibraryForm={showLibraryForm}
          setShowLibraryForm={setShowLibraryForm}
          libraryForm={libraryForm}
          setLibraryForm={setLibraryForm}
          addProductToLibrary={addProductToLibrary}
          deleteProductFromLibrary={deleteProductFromLibrary}
          logProductFromLibrary={logProductFromLibrary}
          onClose={() => setShowLibraryModal(false)}
        />
      )}

      {/* bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-center bottom-nav">
        <div className="max-w-xl w-full flex bottom-nav-inner">
          {Object.entries(tabMeta).map(([key, meta]) => {
            const Icon = meta.icon;
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 tab-button ${active ? "tab-button-active" : ""}`}
                style={{ color: active ? meta.accent : palette.mutedInk }}
              >
                <span className="tab-icon-wrap">
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                </span>
                <span className="text-[11px] tab-label" style={{ fontWeight: active ? 700 : 500 }}>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl p-4 mb-4 app-card" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}>
      {children}
    </div>
  );
}

function isOverdue(due) {
  if (!due || !due.date) return false;
  const dt = new Date(`${due.date}T${due.time || "23:59"}`);
  return dt.getTime() < Date.now();
}

function isDueToday(due) {
  return Boolean(due && due.date === getDateKey());
}

function taskDueTime(task) {
  return task.due ? new Date(`${task.due.date}T${task.due.time || "23:59"}`).getTime() : Infinity;
}

function taskPriorityRank(task) {
  const p = getTaskPriority(task);
  if (p === "high") return 0;
  if (p === "normal") return 1;
  return 2;
}

function sortTasksSmart(a, b) {
  const aDone = isTaskDone(a);
  const bDone = isTaskDone(b);
  if (aDone !== bDone) return aDone ? 1 : -1;
  const aOverdue = !aDone && isOverdue(a.due);
  const bOverdue = !bDone && isOverdue(b.due);
  if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
  const aDue = taskDueTime(a);
  const bDue = taskDueTime(b);
  if (aDue !== bDue) return aDue - bDue;
  const aPr = taskPriorityRank(a);
  const bPr = taskPriorityRank(b);
  if (aPr !== bPr) return aPr - bPr;
  return (a.createdAt || 0) - (b.createdAt || 0);
}

function formatDue(due) {
  if (!due || !due.date) return "";
  const txt = formatShortDate(due.date);
  return due.time ? `${txt} · ${due.time}` : txt;
}

function TasksView({
  tasks, newTaskText, setNewTaskText, newTaskPriority, setNewTaskPriority, taskFilter, setTaskFilter,
  addTask, toggleTask, updateTaskStatus, updateTaskStatusText, updateTaskPriority, deleteTask, clearDoneTasks,
  showDueFields, setShowDueFields, dueDateInput, setDueDateInput, dueTimeInput, setDueTimeInput,
}) {
  const activeTasks = tasks.filter((t) => !isTaskDone(t)).slice().sort(sortTasksSmart);
  const doneTasks = tasks.filter((t) => isTaskDone(t)).slice().sort(sortTasksSmart);
  const overdueTasks = activeTasks.filter((t) => isOverdue(t.due));
  const todayTasks = activeTasks.filter((t) => isDueToday(t.due));
  const highTasks = activeTasks.filter((t) => getTaskPriority(t) === "high");

  const filterOptions = [
    { key: "open", label: `פתוחות (${activeTasks.length})` },
    { key: "today", label: `היום (${todayTasks.length})` },
    { key: "high", label: `דחופות (${highTasks.length})` },
    { key: "done", label: `בוצעו (${doneTasks.length})` },
    { key: "all", label: `הכל (${tasks.length})` },
  ];

  const shownTasks = (() => {
    if (taskFilter === "today") return todayTasks;
    if (taskFilter === "high") return highTasks;
    if (taskFilter === "done") return doneTasks;
    if (taskFilter === "all") return tasks.slice().sort(sortTasksSmart);
    return activeTasks;
  })();

  return (
    <div>
      <Card>
        <div className="flex gap-2 mb-2">
          <input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !showDueFields && addTask()}
            placeholder="מה צריך לעשות?"
            className="flex-1 rounded-xl px-3 py-2 outline-none"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          />
          <button
            onClick={() => setShowDueFields((v) => !v)}
            className="rounded-xl px-3 flex items-center justify-center"
            style={{
              background: showDueFields || dueDateInput ? palette.tasksAccentSoft : palette.bg,
              color: palette.tasksAccent,
              border: `1px solid ${palette.border}`,
            }}
          >
            <Calendar size={18} />
          </button>
          <button
            onClick={addTask}
            className="rounded-xl px-3 flex items-center justify-center"
            style={{ background: palette.tasksAccent, color: "#fff" }}
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="mb-2">
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="w-full rounded-xl px-3 py-2 outline-none text-sm"
            style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.ink }}
          >
            <option value="normal">עדיפות רגילה</option>
            <option value="high">עדיפות דחופה</option>
            <option value="low">עדיפות נמוכה</option>
          </select>
        </div>

        {showDueFields && (
          <div className="flex gap-2">
            <input
              type="date"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
              className="flex-1 rounded-xl px-3 py-2 outline-none text-sm"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            />
            <input
              type="time"
              value={dueTimeInput}
              onChange={(e) => setDueTimeInput(e.target.value)}
              className="flex-1 rounded-xl px-3 py-2 outline-none text-sm"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            />
          </div>
        )}
      </Card>

      {tasks.length > 0 && (
        <Card>
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            <MiniStat label="פתוחות" value={activeTasks.length} />
            <MiniStat label="היום" value={todayTasks.length} />
            <MiniStat label="דחופות" value={highTasks.length} danger={highTasks.length > 0} />
            <MiniStat label="באיחור" value={overdueTasks.length} danger={overdueTasks.length > 0} />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterOptions.map((f) => {
              const active = taskFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setTaskFilter(f.key)}
                  className="rounded-xl px-3 py-1.5 text-xs whitespace-nowrap"
                  style={{
                    background: active ? palette.tasksAccent : palette.bg,
                    color: active ? "#fff" : palette.mutedInk,
                    border: `1px solid ${active ? palette.tasksAccent : palette.border}`,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {doneTasks.length > 0 && (
            <button onClick={clearDoneTasks} className="text-xs flex items-center gap-1 mt-3" style={{ color: palette.mutedInk }}>
              <RotateCcw size={12} /> נקה משימות שבוצעו
            </button>
          )}
        </Card>
      )}

      {tasks.length === 0 && (
        <p className="text-sm text-center mt-8" style={{ color: palette.mutedInk }}>
          הרשימה פנויה. מה הדבר הראשון שצריך לעשות היום?
        </p>
      )}

      {tasks.length > 0 && shownTasks.length === 0 && (
        <p className="text-sm text-center mt-6" style={{ color: palette.mutedInk }}>
          אין משימות להצגה בסינון הזה.
        </p>
      )}

      {shownTasks.length > 0 && (
        <div className="space-y-2 mb-4">
          {shownTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onStatusChange={(status) => updateTaskStatus(task.id, status)}
              onStatusTextChange={(statusText) => updateTaskStatusText(task.id, statusText)}
              onPriorityChange={(priority) => updateTaskPriority(task.id, priority)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, danger }) {
  return (
    <div className="rounded-xl py-2 px-1" style={{ background: danger ? "#F7E5E2" : palette.tasksAccentSoft }}>
      <p className="text-base font-semibold" style={{ color: danger ? palette.danger : palette.tasksAccent }}>{value}</p>
      <p className="text-[10px]" style={{ color: palette.mutedInk }}>{label}</p>
    </div>
  );
}

function TaskRow({ task, onToggle, onStatusChange, onStatusTextChange, onPriorityChange, onDelete }) {
  const status = getTaskStatus(task);
  const done = status === "done";
  const priority = getTaskPriority(task);
  const overdue = !done && isOverdue(task.due);
  const priorityColor = priority === "high" ? palette.danger : priority === "low" ? palette.mutedInk : palette.tasksAccent;

  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: palette.surface, border: `1px solid ${overdue ? palette.danger : palette.border}` }}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle} style={{ color: done ? palette.tasksAccent : palette.mutedInk }}>
          {done ? <CheckSquare size={20} /> : <Square size={20} />}
        </button>
        <div className="flex-1 min-w-0">
          <span
            className="text-sm block"
            style={{ color: done ? palette.mutedInk : palette.ink, textDecoration: done ? "line-through" : "none" }}
          >
            {task.text}
          </span>
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            {task.due && task.due.date && (
              <span className="text-[11px] flex items-center gap-1" style={{ color: overdue ? palette.danger : palette.mutedInk }}>
                <Calendar size={11} /> {formatDue(task.due)}{overdue ? " · באיחור" : ""}
              </span>
            )}
            <span className="text-[11px]" style={{ color: priorityColor }}>
              {TASK_PRIORITY[priority] || TASK_PRIORITY.normal}
            </span>
          </div>
        </div>
        <button onClick={onDelete} style={{ color: palette.mutedInk }}>
          <X size={16} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 pr-8">
        <label className="text-[11px]" style={{ color: palette.mutedInk }}>
          סטטוס
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="mt-1 w-full rounded-xl px-3 py-2 outline-none text-xs"
            style={{ background: done ? palette.tasksAccentSoft : palette.bg, border: `1px solid ${palette.border}`, color: done ? palette.tasksAccent : palette.ink }}
          >
            <option value="not_done">לא בוצע</option>
            <option value="done">בוצע</option>
          </select>
        </label>

        <label className="text-[11px]" style={{ color: palette.mutedInk }}>
          עדיפות
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="mt-1 w-full rounded-xl px-3 py-2 outline-none text-xs"
            style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: priorityColor }}
          >
            <option value="normal">רגילה</option>
            <option value="high">דחופה</option>
            <option value="low">נמוכה</option>
          </select>
        </label>
      </div>

      <div className="mt-2 pr-8">
        <input
          value={task.statusText || ""}
          onChange={(e) => onStatusTextChange(e.target.value)}
          placeholder="כתוב איפה המשימה עומדת... למשל: בטיפול / מחכה לאישור / תקוע"
          className="w-full rounded-xl px-3 py-2 outline-none text-xs"
          style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.ink }}
        />
      </div>
    </div>
  );
}

function StatChip({ label, value, accent, soft }) {
  return (
    <div className="flex-1 rounded-xl py-1.5 px-1 text-center min-w-0" style={{ background: soft }}>
      <p className="text-base font-semibold whitespace-nowrap" style={{ color: accent }}>{value}</p>
      <p className="text-[10px] whitespace-nowrap" style={{ color: palette.mutedInk }}>{label}</p>
    </div>
  );
}

function FoodView({
  foodForm, setFoodForm, applyAutoFoodEstimate, addFood, foodEntries, deleteFood, totals,
  savedFoods, showLibraryModal, setShowLibraryModal,
}) {
  return (
    <div>
      <Card>
        <p className="text-xs mb-2" style={{ color: palette.mutedInk }}>סיכום היום</p>
        <div className="flex gap-1.5">
          <StatChip label="קלוריות" value={Math.round(totals.calories)} accent={palette.foodAccent} soft={palette.foodAccentSoft} />
          <StatChip label='חלבון (ג)' value={Math.round(totals.protein)} accent={palette.foodAccent} soft={palette.foodAccentSoft} />
          <StatChip label='שומן (ג)' value={Math.round(totals.fat)} accent={palette.foodAccent} soft={palette.foodAccentSoft} />
        </div>
      </Card>

      <button
        onClick={() => setShowLibraryModal(true)}
        className="w-full rounded-2xl p-4 mb-4 flex items-center justify-between"
        style={{ background: palette.surface, border: `1px solid ${palette.border}` }}
      >
        <span className="text-sm font-medium flex items-center gap-1.5">
          <BookOpen size={16} style={{ color: palette.foodAccent }} /> ספר מוצרים
          <span style={{ color: palette.mutedInk }} className="text-xs">
            {savedFoods.length > 0 ? `(${savedFoods.length})` : ""}
          </span>
        </span>
        <ChevronLeft size={18} style={{ color: palette.mutedInk }} />
      </button>

      <Card>
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-sm font-medium">הוספת אוכל</p>
          <span className="text-[10px] rounded-full px-2 py-1" style={{ background: palette.foodAccentSoft, color: palette.foodAccent }}>מחשבון קלוריות אוטומטי</span>
        </div>
        <p className="text-[11px] mb-3" style={{ color: palette.mutedInk }}>
          כתוב מאכל וכמות בגרמים. לדוגמה: אורז 110 גרם, פיצה 150 גרם, שווארמה 200 גרם. אם המאכל נמצא במאגר, קלוריות/חלבון/שומן יתמלאו לבד.
        </p>
        <div className="space-y-2">
          <input
            value={foodForm.name}
            onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
            placeholder="מה אכלת? למשל: שווארמה 200 גרם / פיצה 150 גרם"
            list="food-suggestions"
            className="w-full rounded-xl px-3 py-2 outline-none"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          />
          <datalist id="food-suggestions">
            {savedFoods.map((p) => <option key={`saved-${p.id}`} value={p.name} />)}
            {CALORIE_SUGGESTIONS.map((item) => <option key={`cal-${item}`} value={item} />)}
            {FOOD_SUGGESTIONS.map((item) => <option key={`food-${item}`} value={item} />)}
          </datalist>
          <div className="flex gap-2">
            <input
              value={foodForm.grams}
              onChange={(e) => setFoodForm({ ...foodForm, grams: e.target.value })}
              placeholder='כמה גרם?'
              inputMode="decimal"
              type="number"
              className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            />
            <button
              onClick={applyAutoFoodEstimate}
              className="rounded-xl px-3 text-sm font-medium whitespace-nowrap"
              style={{ background: palette.foodAccentSoft, color: palette.foodAccent, border: `1px solid ${palette.border}` }}
              type="button"
            >
              חשב עכשיו
            </button>
          </div>
          {foodForm.autoNote && (
            <p className="text-[11px] rounded-xl px-3 py-2" style={{ background: palette.foodAccentSoft, color: palette.foodAccent }}>
              {foodForm.autoNote}
            </p>
          )}
          <p className="text-[11px] mt-1" style={{ color: palette.mutedInk }}>פרטים אופציונליים</p>
          <div className="flex gap-2">
            <input
              value={foodForm.calories}
              onChange={(e) => setFoodForm({ ...foodForm, calories: e.target.value })}
              placeholder="קלוריות"
              type="number"
              className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            />
            <input
              value={foodForm.protein}
              onChange={(e) => setFoodForm({ ...foodForm, protein: e.target.value })}
              placeholder='חלבון (ג)'
              type="number"
              className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            />
            <input
              value={foodForm.fat}
              onChange={(e) => setFoodForm({ ...foodForm, fat: e.target.value })}
              placeholder='שומן (ג)'
              type="number"
              className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => addFood("quick")}
              className="w-full rounded-xl py-2 flex items-center justify-center gap-1 font-medium"
              style={{ background: palette.foodAccent, color: "#fff" }}
            >
              <Plus size={18} /> הוסף / חשב אוטומטית
            </button>
            <button
              onClick={() => addFood("detailed")}
              className="w-full rounded-xl py-2 flex items-center justify-center gap-1 font-medium"
              style={{ background: palette.foodAccentSoft, color: palette.foodAccent }}
            >
              <Plus size={18} /> הוסף ידנית עם פרטים
            </button>
          </div>
        </div>
      </Card>

      {foodEntries.length === 0 ? (
        <p className="text-sm text-center mt-6" style={{ color: palette.mutedInk }}>עדיין לא נרשם אוכל היום.</p>
      ) : (
        <div className="space-y-2">
          {foodEntries.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 list-row" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}>
              <div className="flex-1">
                <p className="text-sm font-medium">{f.name}</p>
                {getFoodProfileLabel(f) && (
                  <p className="text-[11px] mt-0.5" style={{ color: palette.foodAccent }}>{getFoodProfileLabel(f)}</p>
                )}
                <p className="text-[11px]" style={{ color: palette.mutedInk }}>
                  {f.time}{f.grams ? ` · ${f.grams} גרם` : ""} · {formatFoodNutrition(f)}
                </p>
              </div>
              <button onClick={() => deleteFood(f.id)} style={{ color: palette.mutedInk }}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductLibraryModal({
  savedFoods, showLibraryForm, setShowLibraryForm, libraryForm, setLibraryForm,
  addProductToLibrary, deleteProductFromLibrary, logProductFromLibrary, onClose,
}) {
  return (
    <div
      className="fixed inset-0 flex items-end justify-center"
      style={{ background: "rgba(20,18,15,0.45)", zIndex: 50 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-t-3xl p-4 flex flex-col"
        style={{ background: palette.surface, maxHeight: "82vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div>
            <p className="text-base font-medium flex items-center gap-1.5">
              <BookOpen size={18} style={{ color: palette.foodAccent }} /> ספר מוצרים
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: palette.mutedInk }}>כל מוצר שתשמור כאן יופיע גם בהשלמה האוטומטית.</p>
          </div>
          <button onClick={onClose} style={{ color: palette.mutedInk }}>
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <button
            onClick={() => setShowLibraryForm((v) => !v)}
            className="w-full text-sm flex items-center justify-center gap-1 rounded-xl py-2 mb-3"
            style={{ background: palette.foodAccentSoft, color: palette.foodAccent }}
          >
            <Plus size={15} /> מוצר חדש
          </button>

          {showLibraryForm && (
            <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: `1px solid ${palette.border}` }}>
              <input
                value={libraryForm.name}
                onChange={(e) => setLibraryForm({ ...libraryForm, name: e.target.value })}
                placeholder="שם המוצר"
                className="w-full rounded-xl px-3 py-2 outline-none"
                style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
              />
              <input
                value={libraryForm.grams}
                onChange={(e) => setLibraryForm({ ...libraryForm, grams: e.target.value })}
                placeholder='לכמה גרם/מנה הערכים? למשל 100 או 45'
                type="number"
                className="w-full rounded-xl px-3 py-2 outline-none"
                style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
              />
              <p className="text-[11px]" style={{ color: palette.mutedInk }}>אם תשמור מוצר עם גרמים, בהמשך הוא יחשב אוטומטית לכל כמות שתכתוב.</p>
              <div className="flex gap-2">
                <input
                  value={libraryForm.calories}
                  onChange={(e) => setLibraryForm({ ...libraryForm, calories: e.target.value })}
                  placeholder="קלוריות"
                  type="number"
                  className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
                  style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                />
                <input
                  value={libraryForm.protein}
                  onChange={(e) => setLibraryForm({ ...libraryForm, protein: e.target.value })}
                  placeholder='חלבון (ג)'
                  type="number"
                  className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
                  style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                />
                <input
                  value={libraryForm.fat}
                  onChange={(e) => setLibraryForm({ ...libraryForm, fat: e.target.value })}
                  placeholder='שומן (ג)'
                  type="number"
                  className="flex-1 rounded-xl px-3 py-2 outline-none min-w-0"
                  style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                />
              </div>
              <button
                onClick={addProductToLibrary}
                className="w-full rounded-xl py-2 text-sm font-medium"
                style={{ background: palette.foodAccent, color: "#fff" }}
              >
                שמירה בספר המוצרים
              </button>
            </div>
          )}

          {savedFoods.length === 0 ? (
            <p className="text-xs text-center py-2" style={{ color: palette.mutedInk }}>
              עדיין אין מוצרים שמורים. הוסיפו מוצר כדי לרשום אותו בלחיצה אחת בכל פעם; מוצרים שמורים יופיעו גם בהשלמה האוטומטית.
            </p>
          ) : (
            <div className="space-y-2 pb-2">
              {savedFoods.map((p) => (
                <div key={p.id} className="flex items-center gap-2 rounded-xl px-3 py-2 list-row" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[11px]" style={{ color: palette.mutedInk }}>
                      {formatFoodNutrition(p)}
                    </p>
                  </div>
                  <button
                    onClick={() => logProductFromLibrary(p)}
                    className="rounded-lg p-1.5 flex-shrink-0"
                    style={{ background: palette.foodAccentSoft, color: palette.foodAccent }}
                    title="הוסף לתפריט היום"
                  >
                    <Plus size={16} />
                  </button>
                  <button onClick={() => deleteProductFromLibrary(p.id)} style={{ color: palette.mutedInk }} className="flex-shrink-0">
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function HistoryView({ historyRows }) {
  return (
    <div>
      <Card>
        <p className="text-sm font-medium mb-1">היסטוריית תזונה ושתייה</p>
        <p className="text-xs" style={{ color: palette.mutedInk }}>
          כאן יופיעו כל הימים שבהם רשמת אוכל או מים. ימים קודמים יישמרו גם אחרי האיפוס היומי.
        </p>
      </Card>

      {historyRows.length === 0 ? (
        <p className="text-sm text-center mt-6" style={{ color: palette.mutedInk }}>עדיין אין היסטוריה להצגה.</p>
      ) : (
        <div className="space-y-3">
          {historyRows.map((day) => (
            <Card key={day.date}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">{formatShortDate(day.date)}</p>
                <p className="text-[11px]" style={{ color: palette.mutedInk }}>
                  {day.food.length} פריטי אוכל · {day.water.length} רשומות מים
                </p>
              </div>

              <div className="flex gap-1.5 mb-3">
                <StatChip label="קלוריות" value={Math.round(day.totals.calories)} accent={palette.foodAccent} soft={palette.foodAccentSoft} />
                <StatChip label='חלבון (ג)' value={Math.round(day.totals.protein)} accent={palette.foodAccent} soft={palette.foodAccentSoft} />
                <StatChip label="מים" value={`${(day.totalWater / 1000).toFixed(2)} ל׳`} accent={palette.waterAccent} soft={palette.waterAccentSoft} />
              </div>

              {day.food.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium mb-1" style={{ color: palette.foodAccent }}>תזונה</p>
                  <div className="space-y-1">
                    {day.food.map((f) => (
                      <p key={f.id} className="text-[12px]" style={{ color: palette.mutedInk }}>
                        {f.time} · {f.name}{getFoodProfileLabel(f) ? ` · ${getFoodProfileLabel(f)}` : ""}{f.grams ? ` · ${f.grams} גרם` : ""} · {formatFoodNutrition(f)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {day.water.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: palette.waterAccent }}>מים</p>
                  <div className="space-y-1">
                    {day.water.slice().reverse().map((w) => (
                      <p key={w.id} className="text-[12px]" style={{ color: palette.mutedInk }}>
                        {w.time} · {w.amount} מ״ל
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function WaterView({ totalWater, waterPct, waterGoalReached, addWater, customWater, setCustomWater, waterEntries, removeWaterEntry }) {
  return (
    <div>
      <Card>
        <div className="flex items-center gap-5">
          <div
            className="relative rounded-2xl overflow-hidden flex-shrink-0"
            style={{ width: 84, height: 140, border: `2px solid ${palette.waterAccent}`, background: palette.bg }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-700"
              style={{ height: `${waterPct}%`, background: `linear-gradient(180deg, #5C9AC4, ${palette.waterAccent})` }}
            >
              <div className="absolute -top-1 left-0 w-[200%] h-2 ripple" style={{
                backgroundImage: "radial-gradient(circle at 5px 2px, rgba(255,255,255,0.45) 2px, transparent 3px)",
                backgroundSize: "10px 4px",
              }} />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-semibold" style={{ color: palette.waterAccent }}>
              {(totalWater / 1000).toFixed(2)} <span className="text-sm font-normal">ל׳</span>
            </p>
            <p className="text-xs mb-1" style={{ color: palette.mutedInk }}>מתוך {(WATER_GOAL / 1000).toFixed(0)} ליטר ליום</p>
            <p className="text-sm" style={{ color: waterGoalReached ? palette.tasksAccent : palette.mutedInk }}>
              {waterGoalReached ? "🎉 הגעת ליעד היום!" : `נשארו ${((WATER_GOAL - totalWater) / 1000).toFixed(2)} ל׳`}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-sm font-medium mb-3">הוספת שתייה</p>
        <div className="flex gap-2 mb-2">
          {WATER_QUICK_ADDS.map((amt) => (
            <button
              key={amt}
              onClick={() => addWater(amt)}
              className="flex-1 rounded-xl py-2 text-sm font-medium"
              style={{ background: palette.waterAccentSoft, color: palette.waterAccent }}
            >
              {'+' + amt + ' מ"ל'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={customWater}
            onChange={(e) => setCustomWater(e.target.value)}
            placeholder='כמות מותאמת (מ"ל)'
            type="number"
            className="flex-1 rounded-xl px-3 py-2 outline-none"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          />
          <button
            onClick={() => {
              const v = parseFloat(customWater);
              if (v > 0) {
                addWater(Math.round(v));
                setCustomWater("");
              }
            }}
            className="rounded-xl px-4 flex items-center justify-center"
            style={{ background: palette.waterAccent, color: "#fff" }}
          >
            <Plus size={18} />
          </button>
        </div>
      </Card>

      {waterEntries.length > 0 && (
        <div className="space-y-2">
          {waterEntries.slice().reverse().map((w) => (
            <div key={w.id} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm list-row" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}>
              <Droplets size={14} style={{ color: palette.waterAccent }} />
              <span className="flex-1">{w.amount + ' מ"ל · ' + w.time}</span>
              <button onClick={() => removeWaterEntry(w.id)} style={{ color: palette.mutedInk }}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeightView({ weightEntries, weightDate, setWeightDate, weightValue, setWeightValue, saveWeight, deleteWeight }) {
  const sortedAsc = weightEntries.slice().sort((a, b) => a.date.localeCompare(b.date));
  const rows = sortedAsc.map((entry, i) => ({
    ...entry,
    delta: i > 0 ? Math.round((entry.weight - sortedAsc[i - 1].weight) * 10) / 10 : null,
  }));
  const rowsDesc = rows.slice().reverse();

  const latest = rows.length > 0 ? rows[rows.length - 1] : null;
  const first = rows.length > 0 ? rows[0] : null;
  const totalChange = latest && first && rows.length > 1 ? Math.round((latest.weight - first.weight) * 10) / 10 : null;

  return (
    <div>
      <Card>
        {latest ? (
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 text-center">
              <p className="text-3xl font-semibold" style={{ color: palette.weightAccent }}>{latest.weight}</p>
              <p className="text-[11px]" style={{ color: palette.mutedInk }}>ק"ג · {formatShortDate(latest.date)}</p>
            </div>
            <div className="flex-1 space-y-1">
              <DeltaLine label="לעומת השקילה הקודמת" delta={latest.delta} />
              {totalChange !== null && <DeltaLine label="סה״כ מאז ההתחלה" delta={totalChange} />}
            </div>
          </div>
        ) : (
          <p className="text-sm text-center" style={{ color: palette.mutedInk }}>עדיין לא נרשמה שקילה.</p>
        )}
      </Card>

      <Card>
        <p className="text-sm font-medium mb-3">עדכון משקל</p>
        <div className="flex gap-2">
          <input
            type="date"
            value={weightDate}
            onChange={(e) => setWeightDate(e.target.value)}
            className="flex-1 rounded-xl px-3 py-2 outline-none text-sm min-w-0"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          />
          <input
            type="number"
            step="0.1"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
            placeholder='ק"ג'
            className="w-20 rounded-xl px-3 py-2 outline-none text-sm"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          />
          <button
            onClick={saveWeight}
            className="rounded-xl px-4 flex items-center justify-center"
            style={{ background: palette.weightAccent, color: "#fff" }}
          >
            <Plus size={18} />
          </button>
        </div>
        <p className="text-[11px] mt-2" style={{ color: palette.mutedInk }}>עדכון לתאריך שכבר קיים יחליף את השקילה הישנה.</p>
      </Card>

      {rowsDesc.length > 0 && (
        <div className="space-y-2">
          {rowsDesc.map((w) => (
            <div key={w.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 list-row" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}>
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm font-medium">{w.weight} ק"ג</span>
                <span className="text-[11px]" style={{ color: palette.mutedInk }}>{formatShortDate(w.date)}</span>
                {w.delta !== null && <DeltaBadge delta={w.delta} />}
              </div>
              <button onClick={() => deleteWeight(w.id)} style={{ color: palette.mutedInk }}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeltaLine({ label, delta }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs" style={{ color: palette.mutedInk }}>{label}</span>
      <DeltaBadge delta={delta} />
    </div>
  );
}

function DeltaBadge({ delta }) {
  if (delta === null) {
    return <span className="text-xs" style={{ color: palette.mutedInk }}>—</span>;
  }
  if (delta === 0) {
    return (
      <span className="text-xs flex items-center gap-0.5" style={{ color: palette.mutedInk }}>
        <Minus size={12} /> ללא שינוי
      </span>
    );
  }
  const up = delta > 0;
  return (
    <span className="text-xs flex items-center gap-0.5 font-medium" style={{ color: up ? palette.danger : palette.tasksAccent }}>
      {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {Math.abs(delta)} ק"ג
    </span>
  );
}
