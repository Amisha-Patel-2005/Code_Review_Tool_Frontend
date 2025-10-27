import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
  const response = await axios.post(`https://code-review-tool-backend.vercel.app/ai/get-review`, { code });
  setReview(response.data);
}



  return (
    <>
      {/* ✅ Added Header */}
      <header className="header">
        <div className="title">
          👨‍💻 Your Code
        </div>
        <div className="title">
          🤖 AI Review
        </div>
      </header>

      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                // border: "1px solid #ddd",
                borderRadius: "5px",
                minHeight:"100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[ rehypeHighlight ]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App


// import { useState, useEffect, useCallback, useRef } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios';
// import './App.css';

// // Debounce helper
// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// function App() {
//   const [code, setCode] = useState(`function sum() {
//   return 1 + 1;
// }`);
//   const [review, setReview] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Flag to prevent multiple retries
//   const retryScheduled = useRef(false);

//   // Highlight code whenever it changes
//   useEffect(() => {
//     prism.highlightAll();
//   }, [code]);

//   // Function to call API
//   const fetchReview = async () => {
//     if (loading) return; // Prevent multiple simultaneous requests
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/ai/get-review', { code });
//       setReview(response.data);
//     } catch (err) {
//       if (err.response?.status === 429) {
//         console.warn("Rate limited! Retrying in 5 seconds...");
//         if (!retryScheduled.current) {
//           retryScheduled.current = true;
//           setTimeout(() => {
//             retryScheduled.current = false;
//             fetchReview();
//           }, 5000);
//         }
//       } else {
//         console.error(err);
//         setReview("❌ Error fetching review. Try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounced function to prevent rapid API calls
//   const reviewCode = useCallback(debounce(fetchReview, 1000), [code]);

//   return (
//     <>
//       <header className="header">
//         <div className="title">👨‍💻 Your Code</div>
//         <div className="title">🤖 AI Review</div>
//       </header>

//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={setCode}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 borderRadius: "5px",
//                 minHeight: "100%",
//                 width: "100%"
//               }}
//             />
//           </div>
//           <div
//             onClick={reviewCode}
//             className="review"
//             style={{ pointerEvents: loading ? "none" : "auto" }}
//           >
//             {loading ? "⏳ Reviewing..." : "Review"}
//           </div>
//         </div>

//         <div className="right">
//           <Markdown rehypePlugins={[rehypeHighlight]}>
//             {review}
//           </Markdown>
//         </div>
//       </main>
//     </>
//   );
// }

// export default App;

