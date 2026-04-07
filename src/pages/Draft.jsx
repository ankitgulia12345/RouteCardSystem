// import { useState, useCallback, useEffect } from "react";

// // ─────────────────────────────────────────────
// //  DRAFT STORAGE KEY
// // ─────────────────────────────────────────────
// const DRAFT_STORAGE_KEY = "routecard_drafts";

// // ─────────────────────────────────────────────
// //  APPS SCRIPT URL  (same as Routecard.jsx)
// // ─────────────────────────────────────────────
// const APPS_SCRIPT_URL =
//   "https://script.google.com/macros/s/AKfycbyMrBcR6_VDQVFgkA7guvHGh2hDflYc5qrBU-EQdrsVQvlMqP0gdhm0wmhOz3JC4xkp/exec";

// // ─────────────────────────────────────────────
// //  SECTION FIELDS MAP  (mirrors Routecard.jsx)
// // ─────────────────────────────────────────────
// const SECTION_FIELDS = {
//   A: ["routeCardNo","startDate","endDate","component","issuedMaterialInvNo",
//       "issuedQty","issuedMaterialInvDate","customer","issuedMaterialInvQty","heatNo"],
//   B: ["softMachiningOkQty","softMachiningRewQty","softMachiningRejQty",
//       "softMachiningDate","softMachiningSign"],
//   C: ["htOkQty","htRewQty","htRejQty","htDate","htSign","htChargeNo","htChargeDate"],
//   D: ["hardMachiningOkQty","hardMachiningRewQty","hardMachiningRejQty",
//       "hardMachiningDate","hardMachiningSign",
//       "cleaningOkQty","cleaningRewQty","cleaningRejQty","cleaningDate","cleaningSign"],
//   E: ["screwInvNo","screwInvDate","screwIssuedQty",
//       "nutInvNo","nutInvDate","nutIssuedQty",
//       "bearingInvNo","bearingInvDate","bearingIssuedQty",
//       "bearingShaftInvNo","shaftInvDate","shaftIssuedQty",
//       "shellBearingInvNo","shellBearingInvDate",
//       "assemblyOkQty","assemblyRewQty","assemblyRejQty","assemblyDate","assemblySign"],
//   F: ["despatchInvoiceNo","despatchInvDate"],
// };

// const ALL_FIELDS = Object.values(SECTION_FIELDS).flat();

// // ─────────────────────────────────────────────
// //  INITIAL FORM STATE
// // ─────────────────────────────────────────────
// const initialState = {
//   routeCardNo:"", startDate:"", endDate:"", component:"", issuedMaterialInvNo:"",
//   issuedQty:"", issuedMaterialInvDate:"", customer:"", issuedMaterialInvQty:"", heatNo:"",
//   softMachiningOkQty:"", softMachiningRewQty:"", softMachiningRejQty:"",
//   softMachiningDate:"", softMachiningSign:"",
//   htOkQty:"", htRewQty:"", htRejQty:"", htDate:"", htSign:"", htChargeNo:"", htChargeDate:"",
//   hardMachiningOkQty:"", hardMachiningRewQty:"", hardMachiningRejQty:"",
//   hardMachiningDate:"", hardMachiningSign:"",
//   cleaningOkQty:"", cleaningRewQty:"", cleaningRejQty:"", cleaningDate:"", cleaningSign:"",
//   screwInvNo:"", screwInvDate:"", screwIssuedQty:"",
//   nutInvNo:"", nutInvDate:"", nutIssuedQty:"",
//   bearingInvNo:"", bearingInvDate:"", bearingIssuedQty:"",
//   bearingShaftInvNo:"", shaftInvDate:"", shaftIssuedQty:"",
//   shellBearingInvNo:"", shellBearingInvDate:"",
//   assemblyOkQty:"", assemblyRewQty:"", assemblyRejQty:"", assemblyDate:"", assemblySign:"",
//   despatchInvoiceNo:"", despatchInvDate:"",
// };

// // ─────────────────────────────────────────────
// //  UTILITY FUNCTIONS
// // ─────────────────────────────────────────────
// const isFilled = (val) => String(val ?? "").trim() !== "";

// function getCompletion(form) {
//   const filled = ALL_FIELDS.filter((f) => isFilled(form[f])).length;
//   const total  = ALL_FIELDS.length;
//   return { filled, total, pct: Math.round((filled / total) * 100) };
// }

// function isComplete(form) {
//   return ALL_FIELDS.every((f) => isFilled(form[f]));
// }

// function getMissingFields(form) {
//   const missing = {};
//   Object.entries(SECTION_FIELDS).forEach(([sec, fields]) => {
//     const m = fields.filter((f) => !isFilled(form[f]));
//     if (m.length) missing[sec] = m;
//   });
//   return missing;
// }

// // ── localStorage helpers ──
// function loadDrafts() {
//   try { return JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || "[]"); }
//   catch { return []; }
// }
// function persistDrafts(drafts) {
//   localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts));
// }

// // ─────────────────────────────────────────────
// //  STYLE TOKENS
// // ─────────────────────────────────────────────
// const S = {
//   wrapper:     { width:"100%", maxWidth:960, margin:"32px auto", padding:"0 16px",
//                  fontFamily:"'Segoe UI', Arial, sans-serif", boxSizing:"border-box" },
//   card:        { background:"#fff", border:"2px solid #111", boxShadow:"5px 5px 0 #111" },
//   sectionLabel:{ background:"#111", color:"#fff", fontSize:11, fontWeight:700,
//                  letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px",
//                  display:"flex", alignItems:"center", justifyContent:"space-between" },
//   fieldLabel:  { fontSize:10, fontWeight:700, letterSpacing:"0.08em",
//                  textTransform:"uppercase", color:"#555", display:"block", marginBottom:4 },
//   fieldInput:  { fontFamily:"monospace", fontSize:14, fontWeight:500, border:"none",
//                  borderBottom:"1.5px solid #bbb", outline:"none", padding:"2px 0",
//                  width:"100%", background:"transparent", color:"#111", boxSizing:"border-box" },
//   table:       { width:"100%", borderCollapse:"collapse", tableLayout:"fixed" },
//   tableInput:  { fontFamily:"monospace", fontSize:13, border:"none",
//                  borderBottom:"1.5px solid #ccc", width:"100%", background:"transparent",
//                  outline:"none", padding:"2px 0", boxSizing:"border-box", color:"#111" },
//   formFooter:  { display:"flex", alignItems:"center", justifyContent:"space-between",
//                  padding:"16px 20px", borderTop:"2px solid #111", background:"#fafafa" },
//   btnBlue:     { background:"#1a56db", color:"#fff", border:"none", padding:"10px 24px",
//                  fontFamily:"inherit", fontSize:13, fontWeight:700,
//                  letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
//   btnBlack:    { background:"#111", color:"#fff", border:"none", padding:"10px 28px",
//                  fontFamily:"inherit", fontSize:13, fontWeight:700,
//                  letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
//   btnGhost:    { background:"transparent", color:"#555", border:"1.5px solid #bbb",
//                  padding:"10px 20px", fontFamily:"inherit", fontSize:13, fontWeight:600,
//                  letterSpacing:"0.06em", textTransform:"uppercase",
//                  cursor:"pointer", marginRight:10 },
//   btnRed:      { background:"#dc2626", color:"#fff", border:"none", padding:"8px 16px",
//                  fontFamily:"inherit", fontSize:12, fontWeight:700,
//                  letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
//   btnGreen:    { background:"#16a34a", color:"#fff", border:"none", padding:"8px 16px",
//                  fontFamily:"inherit", fontSize:12, fontWeight:700,
//                  letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
// };

// const cell = (last=false, span2=false) => ({
//   padding:"10px 12px", borderRight: last?"none":"1px solid #ccc",
//   borderBottom:"1px solid #ccc", display:"flex", flexDirection:"column",
//   boxSizing:"border-box", gridColumn: span2?"span 2":undefined,
// });
// const thStyle = (last=false) => ({
//   background:"#f5f5f5", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
//   textTransform:"uppercase", padding:"8px 12px", textAlign:"left",
//   borderRight: last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc", color:"#333",
// });
// const tdStyle = (last=false) => ({
//   padding:"8px 12px",
//   borderRight: last?"none":"1px solid #eee",
//   borderBottom:"1px solid #eee",
// });
// const asmCell = (last=false) => ({
//   padding:"8px 12px", borderRight: last?"none":"1px solid #ccc",
//   borderBottom:"1px solid #ccc", display:"flex", flexDirection:"column", boxSizing:"border-box",
// });

// // ─────────────────────────────────────────────
// //  STATUS LIGHT  (reused from Routecard.jsx logic)
// // ─────────────────────────────────────────────
// function StatusLight({ form, section }) {
//   const fields  = SECTION_FIELDS[section] || [];
//   const filled  = fields.filter((f) => isFilled(form[f])).length;
//   const total   = fields.length;
//   const allGreen = filled === total;
//   return (
//     <span style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
//       <span
//         title={`${filled}/${total} fields filled`}
//         style={{
//           display:"inline-block", width:11, height:11, borderRadius:"50%",
//           background: allGreen ? "#22c55e" : "#ef4444",
//           boxShadow: allGreen
//             ? "0 0 0 2px rgba(34,197,94,0.3),0 0 8px rgba(34,197,94,0.7)"
//             : "0 0 0 2px rgba(239,68,68,0.3),0 0 8px rgba(239,68,68,0.7)",
//           flexShrink:0, transition:"background 0.3s, box-shadow 0.3s",
//         }}
//       />
//       <span style={{ fontSize:10, fontWeight:700, color: allGreen?"#86efac":"#fca5a5" }}>
//         {filled}/{total}
//       </span>
//     </span>
//   );
// }

// // ─────────────────────────────────────────────
// //  PROGRESS BAR
// // ─────────────────────────────────────────────
// function ProgressBar({ pct }) {
//   const color = pct === 100 ? "#16a34a" : pct >= 60 ? "#ca8a04" : "#dc2626";
//   return (
//     <div style={{ width:"100%", height:6, background:"#e5e7eb", borderRadius:3, overflow:"hidden" }}>
//       <div style={{
//         height:"100%", width:`${pct}%`, background:color,
//         borderRadius:3, transition:"width 0.4s ease",
//       }} />
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  DRAFT CARD  (list item in the drafts view)
// // ─────────────────────────────────────────────
// function DraftCard({ draft, onEdit, onDelete, onSubmit, submitting }) {
//   const { filled, total, pct } = getCompletion(draft.form);
//   const complete = pct === 100;
//   const missing  = getMissingFields(draft.form);

//   return (
//     <div style={{
//       background:"#fff", border:"2px solid #111",
//       boxShadow:"4px 4px 0 #111", padding:"18px 20px", marginBottom:16,
//     }}>
//       {/* Row 1 — title + badges */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:14 }}>
//         <div>
//           <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//             <span style={{ fontSize:16, fontWeight:800, letterSpacing:"0.04em", color:"#111" }}>
//               {draft.model || "Unknown Model"}
//             </span>
//             <span style={{
//               fontSize:10, fontWeight:700, letterSpacing:"0.08em", padding:"2px 8px",
//               background: complete ? "#dcfce7" : "#fef9c3",
//               color: complete ? "#15803d" : "#854d0e",
//               border: `1px solid ${complete ? "#86efac" : "#fde68a"}`,
//             }}>
//               {complete ? "READY TO SUBMIT" : "INCOMPLETE DRAFT"}
//             </span>
//           </div>
//           <div style={{ fontSize:11, color:"#888", marginTop:4, fontFamily:"monospace" }}>
//             Draft ID: {draft.id} &nbsp;·&nbsp; Saved: {new Date(draft.savedAt).toLocaleString()}
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
//           <button style={S.btnGhost} onClick={() => onEdit(draft)}>✏️ Edit</button>
//           {complete && (
//             <button
//               style={{ ...S.btnGreen, opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
//               onClick={() => onSubmit(draft)}
//               disabled={submitting}
//             >
//               {submitting ? "Submitting…" : "✓ Submit to Sheet"}
//             </button>
//           )}
//           <button style={S.btnRed} onClick={() => onDelete(draft.id)}>🗑 Delete</button>
//         </div>
//       </div>

//       {/* Progress bar */}
//       <div style={{ marginBottom:10 }}>
//         <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"0.06em", textTransform:"uppercase" }}>
//             Completion
//           </span>
//           <span style={{ fontSize:12, fontWeight:800, color: complete?"#16a34a":"#dc2626" }}>
//             {filled}/{total} fields &nbsp;({pct}%)
//           </span>
//         </div>
//         <ProgressBar pct={pct} />
//       </div>

//       {/* Section lights */}
//       <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom: Object.keys(missing).length ? 12 : 0 }}>
//         {Object.keys(SECTION_FIELDS).map((sec) => {
//           const { filled: sf, total: st, done } = {
//             filled: SECTION_FIELDS[sec].filter((f) => isFilled(draft.form[f])).length,
//             total:  SECTION_FIELDS[sec].length,
//             done:   SECTION_FIELDS[sec].every((f) => isFilled(draft.form[f])),
//           };
//           return (
//             <span key={sec} style={{
//               display:"inline-flex", alignItems:"center", gap:5,
//               background: done ? "#f0fdf4" : "#fff1f2",
//               border: `1px solid ${done ? "#86efac" : "#fecaca"}`,
//               padding:"3px 10px", fontSize:11, fontWeight:700,
//             }}>
//               <span style={{
//                 width:7, height:7, borderRadius:"50%",
//                 background: done ? "#22c55e" : "#ef4444",
//                 display:"inline-block",
//               }} />
//               {sec}  {sf}/{st}
//             </span>
//           );
//         })}
//       </div>

//       {/* Missing fields summary */}
//       {Object.keys(missing).length > 0 && (
//         <details style={{ marginTop:8 }}>
//           <summary style={{ fontSize:11, fontWeight:700, color:"#dc2626", cursor:"pointer", letterSpacing:"0.06em", textTransform:"uppercase" }}>
//             ⚠ {Object.values(missing).flat().length} fields still empty — click to see
//           </summary>
//           <div style={{ marginTop:8, display:"flex", flexWrap:"wrap", gap:6 }}>
//             {Object.entries(missing).map(([sec, fields]) =>
//               fields.map((f) => (
//                 <span key={f} style={{
//                   fontSize:10, fontFamily:"monospace", background:"#fff1f2",
//                   border:"1px solid #fecaca", padding:"2px 7px", color:"#991b1b",
//                 }}>
//                   [{sec}] {f}
//                 </span>
//               ))
//             )}
//           </div>
//         </details>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  DRAFT EDITOR  (full route card form)
// // ─────────────────────────────────────────────
// function DraftEditor({ draft, onSaveDraft, onSubmitFinal, onCancel }) {
//   const [form, setForm]         = useState(draft ? { ...draft.form } : { ...initialState });
//   const [model]                 = useState(draft?.model || "");
//   const [submitting, setSubmit] = useState(false);
//   const [saveMsg, setSaveMsg]   = useState("");
//   const [submitMsg, setSubmitMsg] = useState("");

//   const handleChange = useCallback((e) => {
//     const field = e.target.getAttribute("data-field");
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));
//   }, []);

//   const handleSaveDraft = () => {
//     onSaveDraft({ ...draft, form, model, savedAt: Date.now() });
//     setSaveMsg("Draft saved!");
//     setTimeout(() => setSaveMsg(""), 2500);
//   };

//   const handleFinalSubmit = async () => {
//     if (!isComplete(form)) {
//       setSubmitMsg("❌ Cannot submit — some fields are still empty. Fill all fields first.");
//       setTimeout(() => setSubmitMsg(""), 4000);
//       return;
//     }
//     setSubmit(true);
//     setSubmitMsg("");
//     try {
//       await fetch(APPS_SCRIPT_URL, {
//         method:"POST", mode:"no-cors",
//         headers:{ "Content-Type":"text/plain" },
//         body: JSON.stringify({ ...form, model }),
//       });
//       onSubmitFinal(draft.id);   // remove from drafts, go back to list
//     } catch {
//       setSubmitMsg("❌ Submit failed. Check your Apps Script URL.");
//     } finally {
//       setSubmit(false);
//     }
//   };

//   const inp  = (field, placeholder="", type="text") => (
//     <input style={S.fieldInput}  type={type} data-field={field} value={form[field]} onChange={handleChange} placeholder={placeholder} />
//   );
//   const tinp = (field, placeholder="", type="text") => (
//     <input style={S.tableInput} type={type} data-field={field} value={form[field]} onChange={handleChange} placeholder={placeholder} />
//   );
//   const lbl  = (text) => <span style={S.fieldLabel}>{text}</span>;

//   const SL = ({ letter, title }) => (
//     <div style={S.sectionLabel}>
//       <span>{letter} — {title}</span>
//       <StatusLight form={form} section={letter} />
//     </div>
//   );

//   const { filled, total, pct } = getCompletion(form);
//   const complete = pct === 100;

//   return (
//     <div style={S.wrapper}>
//       {/* ── TOP TOOLBAR ── */}
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
//         <div>
//           <div style={{ fontSize:18, fontWeight:800, letterSpacing:"0.04em", textTransform:"uppercase" }}>
//             Editing Draft — {model}
//           </div>
//           <div style={{ fontSize:11, color:"#888", marginTop:3 }}>
//             Draft ID: {draft.id}
//           </div>
//         </div>
//         <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
//           {saveMsg && (
//             <span style={{ fontSize:12, fontWeight:700, color:"#16a34a", background:"#dcfce7", padding:"4px 12px", border:"1px solid #86efac" }}>
//               {saveMsg}
//             </span>
//           )}
//           <button style={S.btnGhost} onClick={onCancel}>← Back to Drafts</button>
//           <button style={{ ...S.btnBlue }} onClick={handleSaveDraft}>💾 Save Draft</button>
//           <button
//             style={{ ...S.btnBlack, opacity: submitting || !complete ? 0.5 : 1, cursor: submitting || !complete ? "not-allowed" : "pointer" }}
//             onClick={handleFinalSubmit}
//             disabled={submitting || !complete}
//             title={!complete ? "Fill all fields before submitting" : "Submit to Google Sheets"}
//           >
//             {submitting ? "Submitting…" : "✓ Submit to Sheet"}
//           </button>
//         </div>
//       </div>

//       {/* ── COMPLETION BAR ── */}
//       <div style={{ background:"#fff", border:"2px solid #111", boxShadow:"4px 4px 0 #111", padding:"14px 20px", marginBottom:20 }}>
//         <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, alignItems:"center" }}>
//           <span style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#555" }}>
//             Overall Completion
//           </span>
//           <span style={{ fontSize:14, fontWeight:800, color: complete ? "#16a34a" : "#dc2626" }}>
//             {filled}/{total} fields filled ({pct}%)
//           </span>
//         </div>
//         <ProgressBar pct={pct} />
//         {!complete && (
//           <div style={{ marginTop:8, fontSize:11, color:"#dc2626", fontWeight:600 }}>
//             ⚠ Submit is locked until all {total - filled} remaining fields are filled.
//           </div>
//         )}
//         {complete && (
//           <div style={{ marginTop:8, fontSize:11, color:"#16a34a", fontWeight:700 }}>
//             ✓ All fields filled — ready to submit to Google Sheets!
//           </div>
//         )}
//         {submitMsg && (
//           <div style={{ marginTop:10, fontSize:12, fontWeight:700, color:"#dc2626", background:"#fff1f2", border:"1px solid #fecaca", padding:"8px 12px" }}>
//             {submitMsg}
//           </div>
//         )}
//       </div>

//       {/* ── FULL ROUTE CARD FORM ── */}
//       <div style={S.card}>

//         {/* Header */}
//         <div style={{ display:"grid", gridTemplateColumns:"1fr auto", borderBottom:"2px solid #111" }}>
//           <div style={{ padding:"14px 20px", borderRight:"2px solid #111" }}>
//             <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", margin:0, color:"#111" }}>
//               Route Card  <span style={{ fontSize:13, fontWeight:500, color:"#888" }}>(Draft)</span>
//             </h1>
//             <p style={{ fontSize:13, fontWeight:500, color:"#444", marginTop:2, marginBottom:0 }}>
//               Roller Rocker Arm — <strong>{model}</strong>
//             </p>
//           </div>
//           <div style={{ padding:"14px 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
//             <div style={{ fontSize:22, fontWeight:800, letterSpacing:"0.06em", color:"#111" }}>SANSERA</div>
//             <div style={{ fontSize:11, color:"#666", fontStyle:"italic", marginTop:2 }}>ideas@work</div>
//           </div>
//         </div>

//         {/* ── A ── */}
//         <SL letter="A" title="Store Use" />
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)" }}>
//           <div style={cell()}>{lbl("Route Card No.")}{inp("routeCardNo")}</div>
//           <div style={cell()}>{lbl("Start Date")}{inp("startDate","","date")}</div>
//           <div style={cell()}>{lbl("End Date")}{inp("endDate","","date")}</div>
//           <div style={cell(true)} />
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)" }}>
//           <div style={cell(false,true)}>{lbl("Component")}{inp("component")}</div>
//           <div style={cell()}>{lbl("Issued Material Inv. No.")}{inp("issuedMaterialInvNo")}</div>
//           <div style={cell(true)} />
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)" }}>
//           <div style={cell()}>{lbl("Issued Qty.")}{inp("issuedQty")}</div>
//           <div style={cell()} />
//           <div style={cell()}>{lbl("Issued Material Inv. Date")}{inp("issuedMaterialInvDate","","date")}</div>
//           <div style={cell(true)} />
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)" }}>
//           <div style={cell()}>{lbl("Customer")}{inp("customer")}</div>
//           <div style={cell()} />
//           <div style={cell()}>{lbl("Issued Material Inv. Qty.")}{inp("issuedMaterialInvQty")}</div>
//           <div style={cell(true)} />
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)" }}>
//           <div style={cell()}>{lbl("Heat No.")}{inp("heatNo")}</div>
//           <div style={cell()} /><div style={cell()} /><div style={cell(true)} />
//         </div>

//         {/* ── B ── */}
//         <SL letter="B" title="Machine Shop Use" />
//         <table style={S.table}>
//           <thead><tr>
//             <th style={{...thStyle(), width:"22%"}}>Operation</th>
//             <th style={thStyle()}>OK Qty.</th><th style={thStyle()}>Rew. Qty.</th>
//             <th style={thStyle()}>Rej. Qty.</th><th style={thStyle()}>Date</th>
//             <th style={thStyle(true)}>Sign.</th>
//           </tr></thead>
//           <tbody><tr>
//             <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Soft Machining</td>
//             <td style={tdStyle()}>{tinp("softMachiningOkQty","0")}</td>
//             <td style={tdStyle()}>{tinp("softMachiningRewQty","0")}</td>
//             <td style={tdStyle()}>{tinp("softMachiningRejQty","0")}</td>
//             <td style={tdStyle()}>{tinp("softMachiningDate","","date")}</td>
//             <td style={tdStyle(true)}>{tinp("softMachiningSign","Signature")}</td>
//           </tr></tbody>
//         </table>

//         {/* ── C ── */}
//         <SL letter="C" title="HT Shop Use" />
//         <table style={S.table}>
//           <thead><tr>
//             <th style={{...thStyle(), width:"22%"}}>Operation</th>
//             <th style={thStyle()}>OK Qty.</th><th style={thStyle()}>Rew. Qty.</th>
//             <th style={thStyle()}>Rej. Qty.</th><th style={thStyle()}>Date</th>
//             <th style={thStyle(true)}>Sign.</th>
//           </tr></thead>
//           <tbody>
//             <tr>
//               <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Heat Treatment</td>
//               <td style={tdStyle()}>{tinp("htOkQty","0")}</td>
//               <td style={tdStyle()}>{tinp("htRewQty","0")}</td>
//               <td style={tdStyle()}>{tinp("htRejQty","0")}</td>
//               <td style={tdStyle()}>{tinp("htDate","","date")}</td>
//               <td style={tdStyle(true)}>{tinp("htSign","Signature")}</td>
//             </tr>
//             <tr>
//               <td style={tdStyle()}>{lbl("HT Charge No.")}{tinp("htChargeNo","—")}</td>
//               <td style={tdStyle()} colSpan={2} />
//               <td style={tdStyle(true)} colSpan={3}>{lbl("HT Charge Date")}{tinp("htChargeDate","","date")}</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* ── D ── */}
//         <SL letter="D" title="Machine Shop Use" />
//         <table style={S.table}>
//           <thead><tr>
//             <th style={{...thStyle(), width:"22%"}}>Operation</th>
//             <th style={thStyle()}>OK Qty.</th><th style={thStyle()}>Rew. Qty.</th>
//             <th style={thStyle()}>Rej. Qty.</th><th style={thStyle()}>Date</th>
//             <th style={thStyle(true)}>Sign.</th>
//           </tr></thead>
//           <tbody>
//             <tr>
//               <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Hard Machining</td>
//               <td style={tdStyle()}>{tinp("hardMachiningOkQty","0")}</td>
//               <td style={tdStyle()}>{tinp("hardMachiningRewQty","0")}</td>
//               <td style={tdStyle()}>{tinp("hardMachiningRejQty","0")}</td>
//               <td style={tdStyle()}>{tinp("hardMachiningDate","","date")}</td>
//               <td style={tdStyle(true)}>{tinp("hardMachiningSign","Signature")}</td>
//             </tr>
//             <tr>
//               <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Cleaning</td>
//               <td style={tdStyle()}>{tinp("cleaningOkQty","0")}</td>
//               <td style={tdStyle()}>{tinp("cleaningRewQty","0")}</td>
//               <td style={tdStyle()}>{tinp("cleaningRejQty","0")}</td>
//               <td style={tdStyle()}>{tinp("cleaningDate","","date")}</td>
//               <td style={tdStyle(true)}>{tinp("cleaningSign","Signature")}</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* ── E ── */}
//         <SL letter="E" title="Assembly Use" />
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//           <div style={asmCell()}>{lbl("Screw Inv. No.")}{inp("screwInvNo","—")}</div>
//           <div style={asmCell()}>{lbl("Screw Inv. Date")}{inp("screwInvDate","","date")}</div>
//           <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("screwIssuedQty","0")}</div>
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//           <div style={asmCell()}>{lbl("Nut Inv. No.")}{inp("nutInvNo","—")}</div>
//           <div style={asmCell()}>{lbl("Nut Inv. Date")}{inp("nutInvDate","","date")}</div>
//           <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("nutIssuedQty","0")}</div>
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//           <div style={asmCell()}>{lbl("Bearing Inv. No.")}{inp("bearingInvNo","—")}</div>
//           <div style={asmCell()}>{lbl("Bearing Inv. Date")}{inp("bearingInvDate","","date")}</div>
//           <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("bearingIssuedQty","0")}</div>
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//           <div style={asmCell()}>{lbl("Bearing Shaft Inv. No.")}{inp("bearingShaftInvNo","—")}</div>
//           <div style={asmCell()}>{lbl("Shaft Inv. Date")}{inp("shaftInvDate","","date")}</div>
//           <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("shaftIssuedQty","0")}</div>
//         </div>
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//           <div style={asmCell()}>{lbl("Shell Bearing Inv. No.")}{inp("shellBearingInvNo","—")}</div>
//           <div style={asmCell()}>{lbl("Shell Bearing Inv. Date")}{inp("shellBearingInvDate","","date")}</div>
//           <div style={asmCell(true)} />
//         </div>
//         <table style={S.table}>
//           <thead><tr>
//             <th style={{...thStyle(), width:"22%"}}>Operation</th>
//             <th style={thStyle()}>OK Qty.</th><th style={thStyle()}>Rew. Qty.</th>
//             <th style={thStyle()}>Rej. Qty.</th><th style={thStyle()}>Date</th>
//             <th style={thStyle(true)}>Sign.</th>
//           </tr></thead>
//           <tbody><tr>
//             <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Assembly</td>
//             <td style={tdStyle()}>{tinp("assemblyOkQty","0")}</td>
//             <td style={tdStyle()}>{tinp("assemblyRewQty","0")}</td>
//             <td style={tdStyle()}>{tinp("assemblyRejQty","0")}</td>
//             <td style={tdStyle()}>{tinp("assemblyDate","","date")}</td>
//             <td style={tdStyle(true)}>{tinp("assemblySign","Signature")}</td>
//           </tr></tbody>
//         </table>

//         {/* ── F ── */}
//         <SL letter="F" title="Dispatch Use" />
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
//           <div style={cell()}>{lbl("Despatch Invoice No.")}{inp("despatchInvoiceNo","—")}</div>
//           <div style={cell(true)}>{lbl("Despatch Inv. Date")}{inp("despatchInvDate","","date")}</div>
//         </div>

//         {/* FOOTER */}
//         <div style={S.formFooter}>
//           <span style={{ fontSize:11, fontFamily:"monospace", color:"#888" }}>F760B/02 — DRAFT</span>
//           <div style={{ display:"flex", gap:8 }}>
//             <button style={S.btnGhost} onClick={onCancel}>← Back</button>
//             <button style={S.btnBlue} onClick={handleSaveDraft}>💾 Save Draft</button>
//             <button
//               style={{ ...S.btnBlack, opacity: submitting || !complete ? 0.5 : 1, cursor: !complete ? "not-allowed" : "pointer" }}
//               onClick={handleFinalSubmit}
//               disabled={submitting || !complete}
//             >
//               {submitting ? "Submitting…" : "✓ Submit to Sheet"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  MAIN DRAFT PAGE  (exported default)
// // ─────────────────────────────────────────────
// export default function Draft() {
//   const [drafts,    setDrafts]    = useState([]);
//   const [editing,   setEditing]   = useState(null);  // draft being edited
//   const [submitting,setSubmitting]= useState(null);  // draft id being submitted
//   const [toast,     setToast]     = useState("");

//   // load from localStorage on mount
//   useEffect(() => { setDrafts(loadDrafts()); }, []);

//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(""), 3500);
//   };

//   // ── called from Routecard.jsx (or any page) via import ──
//   // Use this function signature if you want to programmatically add a draft:
//   // addDraft(form, model)
//   // But the page itself only manages drafts — creation happens in Routecard

//   const handleEdit = (draft) => setEditing(draft);

//   const handleSaveDraft = (updatedDraft) => {
//     const next = drafts.map((d) => d.id === updatedDraft.id ? updatedDraft : d);
//     setDrafts(next);
//     persistDrafts(next);
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this draft? This cannot be undone.")) return;
//     const next = drafts.filter((d) => d.id !== id);
//     setDrafts(next);
//     persistDrafts(next);
//     showToast("Draft deleted.");
//   };

//   const handleSubmitFromList = async (draft) => {
//     if (!isComplete(draft.form)) return;
//     setSubmitting(draft.id);
//     try {
//       await fetch(APPS_SCRIPT_URL, {
//         method:"POST", mode:"no-cors",
//         headers:{ "Content-Type":"text/plain" },
//         body: JSON.stringify({ ...draft.form, model: draft.model }),
//       });
//       const next = drafts.filter((d) => d.id !== draft.id);
//       setDrafts(next);
//       persistDrafts(next);
//       showToast("✓ Route Card submitted to Google Sheets and removed from drafts!");
//     } catch {
//       showToast("❌ Submit failed. Check your Apps Script URL.");
//     } finally {
//       setSubmitting(null);
//     }
//   };

//   const handleSubmitFinal = (id) => {
//     const next = drafts.filter((d) => d.id !== id);
//     setDrafts(next);
//     persistDrafts(next);
//     setEditing(null);
//     showToast("✓ Route Card submitted to Google Sheets and removed from drafts!");
//   };

//   // ── Editor view ──
//   if (editing) {
//     return (
//       <DraftEditor
//         draft={editing}
//         onSaveDraft={(updated) => { handleSaveDraft(updated); setEditing(updated); }}
//         onSubmitFinal={handleSubmitFinal}
//         onCancel={() => setEditing(null)}
//       />
//     );
//   }

//   // ── Draft list view ──
//   const totalDrafts    = drafts.length;
//   const readyToSubmit  = drafts.filter((d) => isComplete(d.form)).length;
//   const incomplete     = totalDrafts - readyToSubmit;

//   return (
//     <div style={S.wrapper}>
//       <style>{`
//         details > summary { list-style: none; }
//         details > summary::-webkit-details-marker { display: none; }
//       `}</style>

//       {/* ── PAGE HEADER ── */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
//         <div>
//           <h2 style={{ margin:0, fontSize:22, fontWeight:800, letterSpacing:"0.04em", textTransform:"uppercase", color:"#111" }}>
//             📋 Draft Route Cards
//           </h2>
//           <p style={{ margin:"6px 0 0", fontSize:13, color:"#666" }}>
//             Incomplete submissions saved here. Complete all fields, then submit to Google Sheets.
//           </p>
//         </div>
//         {/* Stats strip */}
//         <div style={{ display:"flex", gap:10 }}>
//           {[
//             { label:"Total Drafts",     value:totalDrafts,   bg:"#f3f4f6", color:"#111" },
//             { label:"Ready to Submit",  value:readyToSubmit, bg:"#dcfce7", color:"#15803d" },
//             { label:"Still Incomplete", value:incomplete,    bg:"#fff1f2", color:"#dc2626" },
//           ].map(({ label, value, bg, color }) => (
//             <div key={label} style={{ background:bg, border:"2px solid #111", boxShadow:"3px 3px 0 #111", padding:"10px 16px", textAlign:"center", minWidth:80 }}>
//               <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
//               <div style={{ fontSize:10, fontWeight:700, color:"#555", textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── TOAST ── */}
//       {toast && (
//         <div style={{
//           background: toast.startsWith("✓") ? "#dcfce7" : "#fff1f2",
//           border:`1.5px solid ${toast.startsWith("✓") ? "#86efac" : "#fecaca"}`,
//           color: toast.startsWith("✓") ? "#15803d" : "#dc2626",
//           padding:"12px 20px", fontSize:13, fontWeight:700, marginBottom:20,
//         }}>
//           {toast}
//         </div>
//       )}

//       {/* ── EMPTY STATE ── */}
//       {drafts.length === 0 && (
//         <div style={{
//           background:"#fafafa", border:"2px dashed #ccc",
//           padding:"60px 24px", textAlign:"center",
//         }}>
//           <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
//           <div style={{ fontSize:16, fontWeight:700, color:"#555", marginBottom:8 }}>No drafts yet</div>
//           <div style={{ fontSize:13, color:"#888" }}>
//             When a Route Card is submitted with missing fields in Routecard.jsx,
//             <br />it will appear here for you to complete and submit.
//           </div>
//         </div>
//       )}

//       {/* ── DRAFT CARDS ── */}
//       {drafts.map((draft) => (
//         <DraftCard
//           key={draft.id}
//           draft={draft}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onSubmit={handleSubmitFromList}
//           submitting={submitting === draft.id}
//         />
//       ))}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  EXPORTED HELPER — call from Routecard.jsx
// //  Usage:
// //    import { saveToDraft } from "./Draft";
// //    saveToDraft(form, selectedModel);
// // ─────────────────────────────────────────────
// export function saveToDraft(form, model) {
//   const drafts = loadDrafts();
//   const newDraft = {
//     id:      `draft_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
//     model,
//     form:    { ...form },
//     savedAt: Date.now(),
//   };
//   drafts.unshift(newDraft);    // newest first
//   persistDrafts(drafts);
//   return newDraft;
// }






import { useState, useCallback, useEffect } from "react";
import { submitToSheet } from "./Routecard";

// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const DRAFT_KEY = "routecard_drafts";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMrBcR6_VDQVFgkA7guvHGh2hDflYc5qrBU-EQdrsVQvlMqP0gdhm0wmhOz3JC4xkp/exec";

// ─────────────────────────────────────────────
//  SECTION FIELDS  (mirrors Routecard.jsx)
// ─────────────────────────────────────────────
const SECTION_FIELDS = {
  A: ["routeCardNo","startDate","endDate","component","issuedMaterialInvNo",
      "issuedQty","issuedMaterialInvDate","customer","issuedMaterialInvQty","heatNo"],
  B: ["softMachiningOkQty","softMachiningRewQty","softMachiningRejQty",
      "softMachiningDate","softMachiningSign"],
  C: ["htOkQty","htRewQty","htRejQty","htDate","htSign","htChargeNo","htChargeDate"],
  D: ["hardMachiningOkQty","hardMachiningRewQty","hardMachiningRejQty",
      "hardMachiningDate","hardMachiningSign",
      "cleaningOkQty","cleaningRewQty","cleaningRejQty","cleaningDate","cleaningSign"],
  E: ["screwInvNo","screwInvDate","screwIssuedQty",
      "nutInvNo","nutInvDate","nutIssuedQty",
      "bearingInvNo","bearingInvDate","bearingIssuedQty",
      "bearingShaftInvNo","shaftInvDate","shaftIssuedQty",
      "shellBearingInvNo","shellBearingInvDate",
      "assemblyOkQty","assemblyRewQty","assemblyRejQty","assemblyDate","assemblySign"],
  F: ["despatchInvoiceNo","despatchInvDate"],
};

const ALL_FIELDS = Object.values(SECTION_FIELDS).flat();

// ─────────────────────────────────────────────
//  INITIAL FORM STATE
// ─────────────────────────────────────────────
const initialState = {
  routeCardNo:"", startDate:"", endDate:"", component:"", issuedMaterialInvNo:"",
  issuedQty:"", issuedMaterialInvDate:"", customer:"", issuedMaterialInvQty:"", heatNo:"",
  softMachiningOkQty:"", softMachiningRewQty:"", softMachiningRejQty:"",
  softMachiningDate:"", softMachiningSign:"",
  htOkQty:"", htRewQty:"", htRejQty:"", htDate:"", htSign:"", htChargeNo:"", htChargeDate:"",
  hardMachiningOkQty:"", hardMachiningRewQty:"", hardMachiningRejQty:"",
  hardMachiningDate:"", hardMachiningSign:"",
  cleaningOkQty:"", cleaningRewQty:"", cleaningRejQty:"", cleaningDate:"", cleaningSign:"",
  screwInvNo:"", screwInvDate:"", screwIssuedQty:"",
  nutInvNo:"", nutInvDate:"", nutIssuedQty:"",
  bearingInvNo:"", bearingInvDate:"", bearingIssuedQty:"",
  bearingShaftInvNo:"", shaftInvDate:"", shaftIssuedQty:"",
  shellBearingInvNo:"", shellBearingInvDate:"",
  assemblyOkQty:"", assemblyRewQty:"", assemblyRejQty:"", assemblyDate:"", assemblySign:"",
  despatchInvoiceNo:"", despatchInvDate:"",
};

// ─────────────────────────────────────────────
//  UTILS
// ─────────────────────────────────────────────
const isFilled   = (v) => String(v ?? "").trim() !== "";
const isComplete = (form) => ALL_FIELDS.every(f => isFilled(form[f]));

function getCompletion(form) {
  const filled = ALL_FIELDS.filter(f => isFilled(form[f])).length;
  return { filled, total: ALL_FIELDS.length, pct: Math.round((filled / ALL_FIELDS.length) * 100) };
}

function getMissing(form) {
  const out = {};
  Object.entries(SECTION_FIELDS).forEach(([sec, fields]) => {
    const m = fields.filter(f => !isFilled(form[f]));
    if (m.length) out[sec] = m;
  });
  return out;
}

function loadDrafts() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "[]"); } catch { return []; }
}
function persist(drafts) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
}

// ─────────────────────────────────────────────
//  EXPORTED HELPER — called from Routecard.jsx
// ─────────────────────────────────────────────
export function saveToDraft(form, model) {
  const drafts = loadDrafts();
  const draft  = {
    id:      `draft_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    model,
    form:    { ...form },
    savedAt: Date.now(),
  };
  drafts.unshift(draft);
  persist(drafts);
  return draft;
}

// ─────────────────────────────────────────────
//  STYLE TOKENS
// ─────────────────────────────────────────────
const S = {
  wrapper:  { width:"100%", maxWidth:960, margin:"32px auto", padding:"0 16px",
              fontFamily:"'Segoe UI',Arial,sans-serif", boxSizing:"border-box" },
  card:     { background:"#fff", border:"2px solid #111", boxShadow:"5px 5px 0 #111" },
  secLabel: { background:"#111", color:"#fff", fontSize:11, fontWeight:700,
              letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px",
              display:"flex", alignItems:"center", justifyContent:"space-between" },
  fLabel:   { fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
              color:"#555", display:"block", marginBottom:4 },
  fInput:   { fontFamily:"monospace", fontSize:14, fontWeight:500, border:"none",
              borderBottom:"1.5px solid #bbb", outline:"none", padding:"2px 0",
              width:"100%", background:"transparent", color:"#111", boxSizing:"border-box" },
  table:    { width:"100%", borderCollapse:"collapse", tableLayout:"fixed" },
  tInput:   { fontFamily:"monospace", fontSize:13, border:"none",
              borderBottom:"1.5px solid #ccc", width:"100%", background:"transparent",
              outline:"none", padding:"2px 0", boxSizing:"border-box", color:"#111" },
  footer:   { display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"16px 20px", borderTop:"2px solid #111", background:"#fafafa" },
  btnBlack: { background:"#111", color:"#fff", border:"none", padding:"10px 26px",
              fontFamily:"inherit", fontSize:13, fontWeight:700,
              letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  btnBlue:  { background:"#1a56db", color:"#fff", border:"none", padding:"10px 22px",
              fontFamily:"inherit", fontSize:13, fontWeight:700,
              letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
  btnGhost: { background:"transparent", color:"#555", border:"1.5px solid #bbb",
              padding:"10px 20px", fontFamily:"inherit", fontSize:13, fontWeight:600,
              letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", marginRight:8 },
  btnRed:   { background:"#dc2626", color:"#fff", border:"none", padding:"8px 16px",
              fontFamily:"inherit", fontSize:12, fontWeight:700,
              letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
  btnGreen: { background:"#16a34a", color:"#fff", border:"none", padding:"8px 16px",
              fontFamily:"inherit", fontSize:12, fontWeight:700,
              letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
};

const cell = (last=false, s2=false) => ({
  padding:"10px 12px", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc",
  display:"flex", flexDirection:"column", boxSizing:"border-box", gridColumn:s2?"span 2":undefined,
});
const th = (last=false) => ({
  background:"#f5f5f5", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
  textTransform:"uppercase", padding:"8px 12px", textAlign:"left",
  borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc", color:"#333",
});
const td = (last=false) => ({
  padding:"8px 12px", borderRight:last?"none":"1px solid #eee", borderBottom:"1px solid #eee",
});
const ac = (last=false) => ({
  padding:"8px 12px", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc",
  display:"flex", flexDirection:"column", boxSizing:"border-box",
});

// ─────────────────────────────────────────────
//  STATUS LIGHT
// ─────────────────────────────────────────────
function StatusLight({ form, section }) {
  const fields   = SECTION_FIELDS[section] || [];
  const filled   = fields.filter(f => isFilled(form[f])).length;
  const total    = fields.length;
  const ok       = filled === total;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
      <span style={{
        display:"inline-block", width:11, height:11, borderRadius:"50%",
        background: ok?"#22c55e":"#ef4444",
        boxShadow: ok
          ? "0 0 0 2px rgba(34,197,94,0.3),0 0 8px rgba(34,197,94,0.7)"
          : "0 0 0 2px rgba(239,68,68,0.3),0 0 8px rgba(239,68,68,0.7)",
        flexShrink:0, transition:"background 0.3s,box-shadow 0.3s",
      }} />
      <span style={{ fontSize:10, fontWeight:700, color:ok?"#86efac":"#fca5a5" }}>
        {filled}/{total}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────
//  PROGRESS BAR
// ─────────────────────────────────────────────
function ProgressBar({ pct }) {
  const color = pct===100 ? "#16a34a" : pct>=60 ? "#ca8a04" : "#dc2626";
  return (
    <div style={{ width:"100%", height:6, background:"#e5e7eb", borderRadius:3, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:3, transition:"width 0.4s" }} />
    </div>
  );
}

// ─────────────────────────────────────────────
//  DRAFT CARD  (in the list view)
// ─────────────────────────────────────────────
function DraftCard({ draft, onEdit, onDelete, onSubmit, submitting }) {
  const { filled, total, pct } = getCompletion(draft.form);
  const complete = pct === 100;
  const missing  = getMissing(draft.form);

  return (
    <div style={{ background:"#fff", border:"2px solid #111", boxShadow:"4px 4px 0 #111",
                  padding:"18px 20px", marginBottom:16 }}>

      {/* Row 1 */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
                    flexWrap:"wrap", gap:8, marginBottom:14 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:16, fontWeight:800, letterSpacing:"0.04em", color:"#111" }}>
              {draft.model || "Unknown Model"}
            </span>
            <span style={{
              fontSize:10, fontWeight:700, letterSpacing:"0.08em", padding:"2px 8px",
              background: complete?"#dcfce7":"#fef9c3",
              color:      complete?"#15803d":"#854d0e",
              border:`1px solid ${complete?"#86efac":"#fde68a"}`,
            }}>
              {complete ? "✓ READY TO SUBMIT" : "⚠ INCOMPLETE DRAFT"}
            </span>
          </div>
          <div style={{ fontSize:11, color:"#888", marginTop:4, fontFamily:"monospace" }}>
            {draft.id} · Saved: {new Date(draft.savedAt).toLocaleString()}
          </div>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button style={S.btnGhost} onClick={()=>onEdit(draft)}>✏️ Edit</button>
          {complete && (
            <button
              style={{ ...S.btnGreen, opacity:submitting?0.6:1, cursor:submitting?"not-allowed":"pointer" }}
              onClick={()=>onSubmit(draft)} disabled={submitting}>
              {submitting ? "Submitting…" : "✓ Submit to Sheet"}
            </button>
          )}
          <button style={S.btnRed} onClick={()=>onDelete(draft.id)}>🗑 Delete</button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
          <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase",
                         letterSpacing:"0.06em", color:"#555" }}>Completion</span>
          <span style={{ fontSize:12, fontWeight:800, color:complete?"#16a34a":"#dc2626" }}>
            {filled}/{total} fields ({pct}%)
          </span>
        </div>
        <ProgressBar pct={pct} />
      </div>

      {/* Section badges */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom: Object.keys(missing).length?10:0 }}>
        {Object.keys(SECTION_FIELDS).map(sec => {
          const sf  = SECTION_FIELDS[sec].filter(f=>isFilled(draft.form[f])).length;
          const st  = SECTION_FIELDS[sec].length;
          const ok  = sf===st;
          return (
            <span key={sec} style={{
              display:"inline-flex", alignItems:"center", gap:5,
              background:ok?"#f0fdf4":"#fff1f2",
              border:`1px solid ${ok?"#86efac":"#fecaca"}`,
              padding:"3px 10px", fontSize:11, fontWeight:700,
            }}>
              <span style={{ width:7, height:7, borderRadius:"50%",
                             background:ok?"#22c55e":"#ef4444", display:"inline-block" }}/>
              {sec}  {sf}/{st}
            </span>
          );
        })}
      </div>

      {/* Missing fields */}
      {Object.keys(missing).length > 0 && (
        <details style={{ marginTop:6 }}>
          <summary style={{ fontSize:11, fontWeight:700, color:"#dc2626", cursor:"pointer",
                            letterSpacing:"0.06em", textTransform:"uppercase" }}>
            ⚠ {Object.values(missing).flat().length} fields still empty — click to see
          </summary>
          <div style={{ marginTop:8, display:"flex", flexWrap:"wrap", gap:6 }}>
            {Object.entries(missing).map(([sec,fields])=>
              fields.map(f=>(
                <span key={f} style={{ fontSize:10, fontFamily:"monospace", background:"#fff1f2",
                                       border:"1px solid #fecaca", padding:"2px 7px", color:"#991b1b" }}>
                  [{sec}] {f}
                </span>
              ))
            )}
          </div>
        </details>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  DRAFT EDITOR  (full route card form)
// ─────────────────────────────────────────────
function DraftEditor({ draft, onSave, onSubmitFinal, onCancel }) {
  const [form,      setForm]     = useState({ ...draft.form });
  const [saving,    setSaving]   = useState(false);
  const [saveMsg,   setSaveMsg]  = useState("");
  const [subMsg,    setSubMsg]   = useState("");
  const [submitting,setSubmit]   = useState(false);

  const handleChange = useCallback((e) => {
    const f = e.target.getAttribute("data-field");
    setForm(prev => ({ ...prev, [f]: e.target.value }));
  }, []);

  const handleSave = () => {
    onSave({ ...draft, form, savedAt:Date.now() });
    setSaveMsg("✓ Draft saved!");
    setTimeout(()=>setSaveMsg(""), 2500);
  };

  const handleFinalSubmit = async () => {
    if (!isComplete(form)) {
      setSubMsg("❌ Fill all fields before submitting.");
      setTimeout(()=>setSubMsg(""),4000);
      return;
    }
    setSubmit(true);
    try {
      await submitToSheet(form, draft.model);
      onSubmitFinal(draft.id);
    } catch {
      setSubMsg("❌ Submit failed. Check Apps Script URL.");
    } finally {
      setSubmit(false);
    }
  };

  const inp  = (f, ph="", type="text") => (
    <input style={S.fInput}  type={type} data-field={f} value={form[f]} onChange={handleChange} placeholder={ph} />
  );
  const tinp = (f, ph="", type="text") => (
    <input style={S.tInput} type={type} data-field={f} value={form[f]} onChange={handleChange} placeholder={ph} />
  );
  const lbl  = (t) => <span style={S.fLabel}>{t}</span>;

  const SL = ({ letter, title }) => (
    <div style={S.secLabel}>
      <span>{letter} — {title}</span>
      <StatusLight form={form} section={letter} />
    </div>
  );

  const { filled, total, pct } = getCompletion(form);
  const complete = pct === 100;

  return (
    <div style={S.wrapper}>
      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    marginBottom:16, flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:18, fontWeight:800, letterSpacing:"0.04em",
                        textTransform:"uppercase", color:"#111" }}>
            Editing Draft — {draft.model}
          </div>
          <div style={{ fontSize:11, color:"#888", marginTop:3 }}>{draft.id}</div>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          {saveMsg && (
            <span style={{ fontSize:12, fontWeight:700, color:"#16a34a",
                           background:"#dcfce7", padding:"4px 12px", border:"1px solid #86efac" }}>
              {saveMsg}
            </span>
          )}
          <button style={S.btnGhost} onClick={onCancel}>← Back to Drafts</button>
          <button style={S.btnBlue}  onClick={handleSave}>💾 Save Draft</button>
          <button
            style={{ ...S.btnBlack, opacity:submitting||!complete?0.5:1,
                     cursor:!complete?"not-allowed":"pointer" }}
            onClick={handleFinalSubmit} disabled={submitting||!complete}
            title={!complete?"Fill all fields first":""}>
            {submitting ? "Submitting…" : "✓ Submit to Sheet"}
          </button>
        </div>
      </div>

      {/* Completion bar */}
      <div style={{ background:"#fff", border:"2px solid #111", boxShadow:"4px 4px 0 #111",
                    padding:"14px 20px", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontSize:12, fontWeight:700, textTransform:"uppercase",
                         letterSpacing:"0.06em", color:"#555" }}>Overall Completion</span>
          <span style={{ fontSize:14, fontWeight:800, color:complete?"#16a34a":"#dc2626" }}>
            {filled}/{total} ({pct}%)
          </span>
        </div>
        <ProgressBar pct={pct} />
        {!complete && (
          <div style={{ marginTop:8, fontSize:11, color:"#dc2626", fontWeight:600 }}>
            ⚠ Submit is locked until all {total-filled} remaining fields are filled.
          </div>
        )}
        {complete && (
          <div style={{ marginTop:8, fontSize:11, color:"#16a34a", fontWeight:700 }}>
            ✓ All fields filled — ready to submit!
          </div>
        )}
        {subMsg && (
          <div style={{ marginTop:10, fontSize:12, fontWeight:700, color:"#dc2626",
                        background:"#fff1f2", border:"1px solid #fecaca", padding:"8px 12px" }}>
            {subMsg}
          </div>
        )}
      </div>

      {/* Full form */}
      <div style={S.card}>
        {/* Header */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", borderBottom:"2px solid #111" }}>
          <div style={{ padding:"14px 20px", borderRight:"2px solid #111" }}>
            <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:"0.04em",
                         textTransform:"uppercase", margin:0, color:"#111" }}>
              Route Card <span style={{ fontSize:13, fontWeight:500, color:"#888" }}>(Draft)</span>
            </h1>
            <p style={{ fontSize:13, fontWeight:500, color:"#444", marginTop:2, marginBottom:0 }}>
              Roller Rocker Arm — <strong>{draft.model}</strong>
            </p>
          </div>
          <div style={{ padding:"14px 20px", display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontSize:22, fontWeight:800, letterSpacing:"0.06em", color:"#111" }}>SANSERA</div>
            <div style={{ fontSize:11, color:"#666", fontStyle:"italic", marginTop:2 }}>ideas@work</div>
          </div>
        </div>

        {/* A */}
        <SL letter="A" title="Store Use" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          <div style={cell()}>{lbl("Route Card No.")}{inp("routeCardNo")}</div>
          <div style={cell()}>{lbl("Start Date")}{inp("startDate","","date")}</div>
          <div style={cell()}>{lbl("End Date")}{inp("endDate","","date")}</div>
          <div style={cell(true)} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          <div style={cell(false,true)}>{lbl("Component")}{inp("component")}</div>
          <div style={cell()}>{lbl("Issued Material Inv. No.")}{inp("issuedMaterialInvNo")}</div>
          <div style={cell(true)} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          <div style={cell()}>{lbl("Issued Qty.")}{inp("issuedQty")}</div>
          <div style={cell()} />
          <div style={cell()}>{lbl("Issued Material Inv. Date")}{inp("issuedMaterialInvDate","","date")}</div>
          <div style={cell(true)} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          <div style={cell()}>{lbl("Customer")}{inp("customer")}</div>
          <div style={cell()} />
          <div style={cell()}>{lbl("Issued Material Inv. Qty.")}{inp("issuedMaterialInvQty")}</div>
          <div style={cell(true)} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          <div style={cell()}>{lbl("Heat No.")}{inp("heatNo")}</div>
          <div style={cell()} /><div style={cell()} /><div style={cell(true)} />
        </div>

        {/* B */}
        <SL letter="B" title="Machine Shop Use" />
        <table style={S.table}>
          <thead><tr>
            <th style={{...th(),width:"22%"}}>Operation</th>
            <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th>
            <th style={th()}>Rej. Qty.</th><th style={th()}>Date</th>
            <th style={th(true)}>Sign.</th>
          </tr></thead>
          <tbody><tr>
            <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Soft Machining</td>
            <td style={td()}>{tinp("softMachiningOkQty","0")}</td>
            <td style={td()}>{tinp("softMachiningRewQty","0")}</td>
            <td style={td()}>{tinp("softMachiningRejQty","0")}</td>
            <td style={td()}>{tinp("softMachiningDate","","date")}</td>
            <td style={td(true)}>{tinp("softMachiningSign","Signature")}</td>
          </tr></tbody>
        </table>

        {/* C */}
        <SL letter="C" title="HT Shop Use" />
        <table style={S.table}>
          <thead><tr>
            <th style={{...th(),width:"22%"}}>Operation</th>
            <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th>
            <th style={th()}>Rej. Qty.</th><th style={th()}>Date</th>
            <th style={th(true)}>Sign.</th>
          </tr></thead>
          <tbody>
            <tr>
              <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Heat Treatment</td>
              <td style={td()}>{tinp("htOkQty","0")}</td>
              <td style={td()}>{tinp("htRewQty","0")}</td>
              <td style={td()}>{tinp("htRejQty","0")}</td>
              <td style={td()}>{tinp("htDate","","date")}</td>
              <td style={td(true)}>{tinp("htSign","Signature")}</td>
            </tr>
            <tr>
              <td style={td()}>{lbl("HT Charge No.")}{tinp("htChargeNo","—")}</td>
              <td style={td()} colSpan={2}/>
              <td style={td(true)} colSpan={3}>{lbl("HT Charge Date")}{tinp("htChargeDate","","date")}</td>
            </tr>
          </tbody>
        </table>

        {/* D */}
        <SL letter="D" title="Machine Shop Use" />
        <table style={S.table}>
          <thead><tr>
            <th style={{...th(),width:"22%"}}>Operation</th>
            <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th>
            <th style={th()}>Rej. Qty.</th><th style={th()}>Date</th>
            <th style={th(true)}>Sign.</th>
          </tr></thead>
          <tbody>
            <tr>
              <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Hard Machining</td>
              <td style={td()}>{tinp("hardMachiningOkQty","0")}</td>
              <td style={td()}>{tinp("hardMachiningRewQty","0")}</td>
              <td style={td()}>{tinp("hardMachiningRejQty","0")}</td>
              <td style={td()}>{tinp("hardMachiningDate","","date")}</td>
              <td style={td(true)}>{tinp("hardMachiningSign","Signature")}</td>
            </tr>
            <tr>
              <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Cleaning</td>
              <td style={td()}>{tinp("cleaningOkQty","0")}</td>
              <td style={td()}>{tinp("cleaningRewQty","0")}</td>
              <td style={td()}>{tinp("cleaningRejQty","0")}</td>
              <td style={td()}>{tinp("cleaningDate","","date")}</td>
              <td style={td(true)}>{tinp("cleaningSign","Signature")}</td>
            </tr>
          </tbody>
        </table>

        {/* E */}
        <SL letter="E" title="Assembly Use" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
          <div style={ac()}>{lbl("Screw Inv. No.")}{inp("screwInvNo","—")}</div>
          <div style={ac()}>{lbl("Screw Inv. Date")}{inp("screwInvDate","","date")}</div>
          <div style={ac(true)}>{lbl("Issued Qty.")}{inp("screwIssuedQty","0")}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
          <div style={ac()}>{lbl("Nut Inv. No.")}{inp("nutInvNo","—")}</div>
          <div style={ac()}>{lbl("Nut Inv. Date")}{inp("nutInvDate","","date")}</div>
          <div style={ac(true)}>{lbl("Issued Qty.")}{inp("nutIssuedQty","0")}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
          <div style={ac()}>{lbl("Bearing Inv. No.")}{inp("bearingInvNo","—")}</div>
          <div style={ac()}>{lbl("Bearing Inv. Date")}{inp("bearingInvDate","","date")}</div>
          <div style={ac(true)}>{lbl("Issued Qty.")}{inp("bearingIssuedQty","0")}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
          <div style={ac()}>{lbl("Bearing Shaft Inv. No.")}{inp("bearingShaftInvNo","—")}</div>
          <div style={ac()}>{lbl("Shaft Inv. Date")}{inp("shaftInvDate","","date")}</div>
          <div style={ac(true)}>{lbl("Issued Qty.")}{inp("shaftIssuedQty","0")}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
          <div style={ac()}>{lbl("Shell Bearing Inv. No.")}{inp("shellBearingInvNo","—")}</div>
          <div style={ac()}>{lbl("Shell Bearing Inv. Date")}{inp("shellBearingInvDate","","date")}</div>
          <div style={ac(true)} />
        </div>
        <table style={S.table}>
          <thead><tr>
            <th style={{...th(),width:"22%"}}>Operation</th>
            <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th>
            <th style={th()}>Rej. Qty.</th><th style={th()}>Date</th>
            <th style={th(true)}>Sign.</th>
          </tr></thead>
          <tbody><tr>
            <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Assembly</td>
            <td style={td()}>{tinp("assemblyOkQty","0")}</td>
            <td style={td()}>{tinp("assemblyRewQty","0")}</td>
            <td style={td()}>{tinp("assemblyRejQty","0")}</td>
            <td style={td()}>{tinp("assemblyDate","","date")}</td>
            <td style={td(true)}>{tinp("assemblySign","Signature")}</td>
          </tr></tbody>
        </table>

        {/* F */}
        <SL letter="F" title="Dispatch Use" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
          <div style={cell()}>{lbl("Despatch Invoice No.")}{inp("despatchInvoiceNo","—")}</div>
          <div style={cell(true)}>{lbl("Despatch Inv. Date")}{inp("despatchInvDate","","date")}</div>
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <span style={{ fontSize:11, fontFamily:"monospace", color:"#888" }}>F760B/02 — DRAFT</span>
          <div style={{ display:"flex", gap:8 }}>
            <button style={S.btnGhost} onClick={onCancel}>← Back</button>
            <button style={S.btnBlue}  onClick={handleSave}>💾 Save Draft</button>
            <button
              style={{ ...S.btnBlack, opacity:submitting||!complete?0.5:1,
                       cursor:!complete?"not-allowed":"pointer" }}
              onClick={handleFinalSubmit} disabled={submitting||!complete}>
              {submitting ? "Submitting…" : "✓ Submit to Sheet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN DRAFT PAGE  (default export)
// ─────────────────────────────────────────────
export default function Draft() {
  const [drafts,    setDrafts]    = useState([]);
  const [editing,   setEditing]   = useState(null);
  const [submitting,setSubmitting]= useState(null);
  const [toast,     setToast]     = useState("");

  useEffect(() => { setDrafts(loadDrafts()); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),3500); };

  const handleEdit   = (draft) => setEditing(draft);

  const handleSave   = (updated) => {
    const next = drafts.map(d => d.id===updated.id ? updated : d);
    setDrafts(next); persist(next);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this draft permanently?")) return;
    const next = drafts.filter(d => d.id!==id);
    setDrafts(next); persist(next); showToast("Draft deleted.");
  };

  const handleSubmitFromList = async (draft) => {
    if (!isComplete(draft.form)) return;
    setSubmitting(draft.id);
    try {
      await submitToSheet(draft.form, draft.model);
      const next = drafts.filter(d => d.id!==draft.id);
      setDrafts(next); persist(next);
      showToast("✓ Submitted to Google Sheets and removed from Drafts!");
    } catch {
      showToast("❌ Submit failed. Check Apps Script URL.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleSubmitFinal = (id) => {
    const next = drafts.filter(d => d.id!==id);
    setDrafts(next); persist(next); setEditing(null);
    showToast("✓ Submitted to Google Sheets and removed from Drafts!");
  };

  // Editor view
  if (editing) {
    return (
      <DraftEditor
        draft={editing}
        onSave={(updated) => { handleSave(updated); setEditing(updated); }}
        onSubmitFinal={handleSubmitFinal}
        onCancel={() => setEditing(null)}
      />
    );
  }

  // List view
  const total  = drafts.length;
  const ready  = drafts.filter(d => isComplete(d.form)).length;
  const inc    = total - ready;

  return (
    <div style={S.wrapper}>
      <style>{`
        details>summary{list-style:none}
        details>summary::-webkit-details-marker{display:none}
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
                    marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ margin:0, fontSize:22, fontWeight:800, letterSpacing:"0.04em",
                       textTransform:"uppercase", color:"#111" }}>📋 Draft Route Cards</h2>
          <p style={{ margin:"6px 0 0", fontSize:13, color:"#666" }}>
            Incomplete submissions saved here. Complete all fields, then submit to Google Sheets.
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {[
            { label:"Total Drafts",     value:total, bg:"#f3f4f6", color:"#111" },
            { label:"Ready to Submit",  value:ready, bg:"#dcfce7", color:"#15803d" },
            { label:"Still Incomplete", value:inc,   bg:"#fff1f2", color:"#dc2626" },
          ].map(({ label, value, bg, color }) => (
            <div key={label} style={{ background:bg, border:"2px solid #111", boxShadow:"3px 3px 0 #111",
                                      padding:"10px 16px", textAlign:"center", minWidth:80 }}>
              <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
              <div style={{ fontSize:10, fontWeight:700, color:"#555", textTransform:"uppercase",
                            letterSpacing:"0.06em", marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          background: toast.startsWith("✓")?"#dcfce7":"#fff1f2",
          border:`1.5px solid ${toast.startsWith("✓")?"#86efac":"#fecaca"}`,
          color:      toast.startsWith("✓")?"#15803d":"#dc2626",
          padding:"12px 20px", fontSize:13, fontWeight:700, marginBottom:20,
        }}>
          {toast}
        </div>
      )}

      {/* Empty state */}
      {drafts.length === 0 && (
        <div style={{ background:"#fafafa", border:"2px dashed #ccc", padding:"60px 24px", textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
          <div style={{ fontSize:16, fontWeight:700, color:"#555", marginBottom:8 }}>No drafts yet</div>
          <div style={{ fontSize:13, color:"#888" }}>
            When a Route Card is submitted with missing fields, it lands here for you to complete.
          </div>
        </div>
      )}

      {/* Draft cards */}
      {drafts.map(draft => (
        <DraftCard
          key={draft.id}
          draft={draft}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSubmit={handleSubmitFromList}
          submitting={submitting===draft.id}
        />
      ))}
    </div>
  );
}