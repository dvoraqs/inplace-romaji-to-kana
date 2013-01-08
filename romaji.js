function convert(textbox)
{
    var posRight = textbox.value.length - getCaretPosition(textbox);
    var left = textbox.value.substring(0, textbox.value.length-posRight);
    var right = textbox.value.substring(textbox.value.length-posRight);
    
    textbox.value = romajiToKana(left) + right;
    setCaretPosition(textbox, textbox.value.length-posRight);
}

function enable(button)
{
    // not yet implemented
}

function disable(button)
{
    // not yet implemented
}

/* romajiToKana 
   Returns a string where all valid romaji from the input has been converted 
   to Japanese kana characters. */
   
function romajiToKana(text)
{
    text += '¶'; // will prevent conversion of 'N' at the end of the input
    var newstr = "";
    
    var con = 'bcdfghjklmnprstvwxyz';
    var ncon = "yhsw'";
    var vowel = "aiueo'"; // should the apostrophies be here?
    
    for (var i = 0; i + 1 < text.length; i++)
    {
        var upper = text.substr(i);
        var lower = upper.toLowerCase();
        var kana = [];
        
        if (con.indexOf(lower[0]) > -1)
        {
            if (lower[0] == lower[1])
            {
                if (ncon.indexOf(lower[2]) > -1 && vowel.indexOf(lower[3]) > -1)
                    kana = lookupKana(upper.substr(1,3), true);
                else if (vowel.indexOf(lower[2]) > -1 && lower[0] != 'n')
                    kana = lookupKana(upper.substr(1,2), true);
                else if (lower[0] == 'n')
                    kana = lookupKana(upper[0], false);
                else
                    kana = [upper[0], 1];
            }
            else
            {
                if ((con.indexOf(lower[1]) > -1 || lower[1] == "'")
                && ncon.indexOf(lower[2]) > -1 && vowel.indexOf(lower[3]) > -1)
                    kana = lookupKana(upper.substr(0,4), false);
                else if ((con.indexOf(lower[1]) > -1 || lower[1] == "'") 
                && vowel.indexOf(lower[2]) > -1)
                    kana = lookupKana(upper.substr(0,3), false);
                else if (vowel.indexOf(lower[1]) > -1)
                    kana = lookupKana(upper.substr(0,2), false);
                else if ((lower[0] == 'n' || lower[0] == 'm') && lower[1] != '¶') 
                    kana = lookupKana(upper[0], false);
                else
                    kana = [upper[0], 1];
            }
        }
        else if (lower[0] == "'" && vowel.indexOf(lower[1]) > -1)
            kana = lookupKana(upper.substr(0,2), false);
        else
            kana = lookupKana(upper[0], false);
        
        newstr += kana[0];
        i += kana[1] - 1;
    }
    
    return newstr;
}

/* lookupKana
   Accepts the romaji for one or character or syllable and a boolean for 
   prepending a small 'tsu' to the output. Returns an array with the kana 
   it represents and the number of romaji characters that were consumed by the 
   kana. If there is no match, it returns the first character of the input and 
   the number one. */

function lookupKana(romaji, prependtsu)
{
    hiragana = " " + "ぁあぃいぅうぇえぉお" + "かがきぎくぐけげこご" + "さざしじすずせぜそぞ" +
               "ただちぢっつづてでとど" + "なにぬねの" + "はばぱひびぴふぶぷへべぺほぼぽ" +
               "まみむめも" + "ゃやゅゆょよ" + "らりるれろ" + "ゎわゐゑをんゔゕゖー";

    katakana = " " + "ァアィイゥウェエォオ" + "カガキギクグケゲコゴ" + "サザシジスズセゼソゾ" +
               "タダチヂッツヅテデトド" + "ナニヌネノ" + "ハバパヒビピフブプヘベペホボポ" +
               "マミムメモ" + "ャヤュユョヨ" + "ラリルレロ" + "ヮワヰヱヲンヴヵヶー";
               
    dic = {'gu': [16], 'rye': [74, 7], 'ge': [18], 'xi': [3], 'ga': [12], 
    'go': [20], 'rya': [74, 67], 'gi': [14], 'xyu': [69], 'tso': [36, 9], 
    'xtu': [35], 'le': [7], 'la': [1], 'lo': [9], 'byu': [51, 69], 'li': [3], 
    'byo': [51, 71], 'lu': [5], 'ti': [33], 'bye': [51, 7], 'bya': [51, 67], 
    'yi': [4, 3], 'do': [41], 'fya': [53, 67], 'xtsu': [35], 'to': [40], 
    'yo': [72], 'di': [34], 'ya': [68], 'dyu': [34, 69], 'de': [39], 
    'ye': [4, 7], 'fyo': [53, 71], 'da': [32], 'dyo': [34, 71], 
    'fyu': [53, 69], 'tsa': [36, 1], 'du': [37], 'yu': [70], 'dya': [34, 67], 
    'shu': [23, 69], "w'e": [6, 7], "j'i": [34], 'ryu': [74, 69], "w'a": [6, 1], 
    'hye': [50, 7], "j'o": [34, 71], "j'a": [34, 67], "w'o": [6, 9], 
    "w'i": [6, 3], 'hyo': [50, 71], 'sha': [23, 67], 'hyu': [50, 69], 
    'shi': [23], "j'u": [34, 69], 'sho': [23, 71], 'zo': [30], 'zi': [24], 
    'ze': [28], "t'u": [40, 5], "d'i": [39, 3], 'za': [22], "d'u": [41, 5], 
    'zu': [26], 'wo': [82], 'ru': [75], "t'yu": [38, 69], 're': [76], 
    'ra': [73], 'ro': [77], 'ri': [74], 'she': [23, 7], 'be': [57], 'we': [81], 
    'ba': [48], 'wa': [79], 'vyu': [84, 69], 'vi': [84, 3], 'ju': [24, 69], 
    'bo': [60], 'bi': [51], 'wi': [80], 'tya': [33, 67], "s'i": [25, 3], 
    'bu': [54], 'wu': [6, 5], 'jo': [24, 71], 'ji': [24], 'je': [24, 7], 
    'ja': [24, 67], 'gwe': [16, 7], "t'i": [38, 3], 'gwa': [16, 1], 'ltu': [35], 
    'gwo': [16, 9], 'tsi': [36, 3], 'gwi': [16, 3], "z'u": [37], 'o': [10], 
    "z'i": [26, 3], 'xwa': [78], 'kwa': [15, 1], 'lke': [86], 'kwe': [15, 7], 
    'xo': [9], 'va': [84, 1], 'kwi': [15, 3], 'xa': [1], 'kwo': [15, 9], 
    'xe': [7], 'xya': [67], 'pya': [52, 67], 'ltsu': [35], 'lka': [85], 
    'u': [6], 'xu': [5], 'cha': [33, 67], 'che': [33, 7], 'pu': [55], 
    'chi': [33], 'cho': [33, 71], 'pa': [49], 'chu': [33, 69], 'pe': [58], 
    'lwa': [78], 'po': [61], 'gye': [14, 7], "z'ya": [34, 67], 'gya': [14, 67], 
    'gyo': [14, 71], 'wyu': [6, 69], 'hu': [53], 'gyu': [14, 69], 'hi': [50], 
    'ho': [59], "z'yu": [34, 69], 'ha': [47], 'he': [56], 'me': [65], 
    'pi': [52], 'ma': [62], 'mo': [66], "h'u": [59, 5], 'mi': [63], 'n': [83], 
    'mu': [64], 'te': [38], 'ta': [31], 'vu': [84], 'lyu': [69], 'xka': [85], 
    'kyo': [13, 71], 've': [84, 7], 'm': [83], 'kya': [13, 67], 'myu': [63, 69], 
    'kye': [13, 7], 'vo': [84, 9], 'tu': [36], 'tyu': [33, 69], 'lya': [67], 
    'myo': [63, 71], 'mya': [63, 67], 'lyo': [71], 'mye': [63, 7], "m'": [83],
    'kyu': [13, 69], 'ni': [43], 'no': [46], 'na': [42], 'fye': [53, 7], 
    '-': [87], 'ne': [45], 'nyu': [43, 69], 'zyu': [24, 69], 'nyo': [43, 71], 
    'zya': [24, 67], "d'yu": [39, 69], 'nya': [43, 67], 'nu': [44], 
    'nye': [43, 7], 'tsu': [36], 'sya': [23, 67], 'tyo': [33, 71], 'fu': [53], 
    'ryo': [74, 71], 'xyo': [71], 'syo': [23, 71], 'pyu': [52, 69], 
    "z'yo": [34, 71], 'fa': [53, 1], "'e": [81], 'fe': [53, 7], 'syu': [23, 69], 
    'pyo': [52, 71], "'o": [82], 'fi': [53, 3], 'xke': [86], 'pye': [52, 7], 
    'fo': [53, 9], 'a': [2], 'tse': [36, 7], 'ka': [11], 'e': [8], 'ke': [17], 
    'hya': [50, 67], 'i': [4], 'zyo': [24, 71], 'ki': [13], 'ko': [19], 
    'tsyu': [36, 69], 'su': [25], "n'": [83], 'si': [23], 'vya': [84, 67], 
    'so': [29], 'se': [27], 'ku': [15], 'vye': [84, 7], 'sa': [21], 
    'vyo': [84, 71], "'i": [80]};
    
    var str = '';
    var consumed = romaji.length;
    if (prependtsu)
    {
        str += 'ッ';
        consumed += 1;
    }
    
    // hiragana
    if (dic[romaji] != undefined)
    {
        var kana = dic[romaji];
        for (var i = 0; i < kana.length; i++)
            str += hiragana[kana[i]];
        return [str, consumed];
    }
    
    // katakana
    else if (dic[romaji.toLowerCase()] != undefined)
    {
        var kana = dic[romaji.toLowerCase()];
        for (var i = 0; i < kana.length; i++)
            str += katakana[kana[i]];
        return [str, consumed];
    }
    
    // no match
    else
        return [romaji[0], 1];
}

/* 
The next two functions were stolen from
http://snipplr.com/view/5144/getset-cursor-in-html-textarea/ 
 */
function getCaretPosition(ctrl) 
{
    var CaretPos = 0;
    // IE Support
    if (document.selection) 
    {
        ctrl.focus ();
        var Sel = document.selection.createRange ();
        
        Sel.moveStart ('character', -ctrl.value.length);
        
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    
    return (CaretPos);
}

function setCaretPosition(ctrl, pos)
{
    if (ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) 
    {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
