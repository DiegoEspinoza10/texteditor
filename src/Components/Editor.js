import React, { useState,useRef } from "react";
import "./Editor.css";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineRollback,
} from "react-icons/ai";



const Editor = () => {

const [text, settext] = useState("");
const [bold, setbold] = useState(false);
const [italian, setitalian] = useState(false);
const [underline, setunderline] = useState(false);
const [font, setfont] = useState(16);
const [align, setalign] = useState("left");
const [quotes, setquotes] = useState(false);
const [currCase, setcurrCase] = useState("capitalize");
const [Analysis, setAnalysis] = useState({});
const [HTMLCODE, setHTMLCODE] = useState("");

  const Bold = () => {
    setbold(!bold);
  };

  const Italian = () => {
    setitalian(!italian);
  };

  const Underline = () => {
    setunderline(!underline);
   
  };

  const changeFont = (operation) => {
    //  this function is used to increase or decrease the font by 1 . operation ==1 means increase by 1 else decrease by 1.
    if(operation == 1){
        setfont(prevFont => prevFont + 1);
    }else{
        setfont(prevFont => Math.max(prevFont - 1, 1));
    }
  };

  const changeAlign = (alignment) => {
    setalign(alignment);
  };

  const Quotes = () => {
    setquotes(!quotes);
  };

  const caseChange = (c) => {
    let newText = '';
    switch (c) {
      case 'u':
        newText = text.toUpperCase(); 
        break;
      case 'l':
        newText = text.toLowerCase(); 
        break;
      case 'c':
        newText = text.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
        break;
      default:
        newText = text;
    }
    settext(newText);
  };

  const reset = () => {
    settext(""); 
    setbold(false); 
    setitalian(false); 
    setunderline(false); 
    setfont(16); 
    setalign("left"); 
    setquotes(false); 
    setcurrCase("capitalize"); 
    
  };
  
  
   
  const Analyse = () => {
    // Analyze the text present in the text area
    const textToAnalyze = text.trim();
    const no_of_letters = textToAnalyze.replace(/[^a-zA-Z]/g, "").length;
    const no_of_words = textToAnalyze.split(/\s+/).filter(word => word !== "").length;
    const no_of_integers = textToAnalyze.replace(/[^0-9]/g, "").length;
    const no_of_spaces = textToAnalyze.replace(/[^\s]/g, "").length;
    const no_of_specialsymbols = textToAnalyze.replace(/[a-zA-Z0-9\s]/g, "").length;
    
    // Create a result object with the analyzed details
    const result = {
      no_of_letters,
      no_of_words,
      no_of_integers,
      no_of_spaces,
      no_of_specialsymbols,
      bold,
      italian,
      underline,
      quotes,
      currCase,
      align,
      font
    };
    setAnalysis(result);
  };
  

  return (
    <div className="editorcomp">
      <div className="button">
        <button className="bold" placeholder="boldbtn" onClick={Bold}>
          <AiOutlineBold />
        </button>
        <button className="italian" placeholder="italian" onClick={Italian}>
          <AiOutlineItalic />
        </button>
        <button className="underline"  placeholder="underline" onClick={Underline}>
          <AiOutlineUnderline />
        </button>
       
        <button className="size" placeholder="Size+" onClick={() => changeFont(1)}>
        A+
        </button>

        <button className="size" placeholder="Size-" onClick={() => changeFont(2)}>
        A-
        </button>
              
       
        <button className="align" onClick={(e) => changeAlign("left")}>
          <AiOutlineAlignLeft />
        </button>
        <button className="align" placeholder="align" onClick={(e) => changeAlign("center")}>
          <AiOutlineAlignCenter />
        </button>
        <button className="align" onClick={(e) => changeAlign("right")}>
          <AiOutlineAlignRight />
        </button>
        <button className="quotes" onClick={Quotes}>
          " "
        </button>

        <button className="caseChange" onClick={(e) => caseChange("u")}>
          UC
        </button>
        <button className="caseChange" onClick={(e) => caseChange("l")}>
          LC
        </button>
        <button className="caseChange" onClick={(e) => caseChange("c")}>
          C
        </button>

        <button className="Empty" onClick={reset}>
          <AiOutlineRollback />
        </button>

        <button className="analyse" onClick={(e) => Analyse()}>
          ANALISE
        </button>

       
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="type Something..."
        style={{ 
            fontWeight: bold ? 'bold' : 'normal' ,
            fontStyle: italian ? 'italic' : 'normal',
            textDecoration : underline ? 'underline' : 'none',
            fontSize: `${font}px`,
            textAlign: `${align}`,

        }} 
        onChange={(e) => settext(e.target.value)}
        value={quotes ? `"${text}"` : text}
      ></textarea>


        <textarea
        placeholder="ANALYSIS"
        disabled
        className="analysis"
        value={JSON.stringify(Analysis, null, 2)} 
        />
     
    </div>
  );
};

export default Editor;