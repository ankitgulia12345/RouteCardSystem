// import { useState, useCallback, useRef, useEffect } from "react";
// import { saveToDraft } from "./Draft";

// const APPS_SCRIPT_URL =
//   "https://script.google.com/macros/s/AKfycbzXW8x6Xwbntn5VK9tB1lfsEXy6JmUhMnmXQSqJbojDCtNZ_myf9dS05hosWr-uGAI/exec";

// export async function submitToSheet(formData, model) {
//   const payload = JSON.stringify({ ...formData, model });
//   const params = new URLSearchParams({ data: payload });
//   await fetch(APPS_SCRIPT_URL, {
//     method: "POST",
//     mode: "no-cors",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params.toString(),
//   });
// }

// const ALL_FIELDS_FLAT = [
//   "routeCardNo","startDate","endDate","component","issuedMaterialInvNo",
//   "issuedQty","issuedMaterialInvDate","customer","issuedMaterialInvQty","heatNo",
//   "softMachiningOkQty","softMachiningRewQty","softMachiningRejQty","softMachiningDate","softMachiningSign",
//   "htOkQty","htRewQty","htRejQty","htDate","htSign","htChargeNo","htChargeDate",
//   "hardMachiningOkQty","hardMachiningRewQty","hardMachiningRejQty","hardMachiningDate","hardMachiningSign",
//   "cleaningOkQty","cleaningRewQty","cleaningRejQty","cleaningDate","cleaningSign",
//   "screwInvNo","screwInvDate","screwIssuedQty",
//   "nutInvNo","nutInvDate","nutIssuedQty",
//   "bearingInvNo","bearingInvDate","bearingIssuedQty",
//   "bearingShaftInvNo","shaftInvDate","shaftIssuedQty",
//   "shellBearingInvNo","shellBearingInvDate",
//   "assemblyOkQty","assemblyRewQty","assemblyRejQty","assemblyDate","assemblySign",
//   "despatchInvoiceNo","despatchInvDate",
// ];

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

// function StatusLight({ form, section }) {
//   const fields   = SECTION_FIELDS[section] || [];
//   const filled   = fields.filter(f => String(form[f] ?? "").trim() !== "").length;
//   const total    = fields.length;
//   const allGreen = filled === total;
//   return (
//     <span style={{ display:"inline-flex", alignItems:"center", gap:6, marginLeft:10 }}>
//       <span
//         title={`${filled}/${total} fields filled`}
//         style={{
//           display:"inline-block", width:11, height:11, borderRadius:"50%",
//           background: allGreen ? "#22c55e" : "#ef4444",
//           boxShadow: allGreen
//             ? "0 0 0 2px rgba(34,197,94,0.3),0 0 8px rgba(34,197,94,0.7)"
//             : "0 0 0 2px rgba(239,68,68,0.3),0 0 8px rgba(239,68,68,0.7)",
//           flexShrink:0, transition:"background 0.3s,box-shadow 0.3s",
//         }}
//       />
//       <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.04em",
//                      color: allGreen?"#86efac":"#fca5a5", opacity:0.9 }}>
//         {filled}/{total}
//       </span>
//     </span>
//   );
// }

// const S = {
//   wrapper:      { width:"100%", maxWidth:900, margin:"32px auto", padding:"0 16px",
//                   fontFamily:"'Segoe UI',Arial,sans-serif", boxSizing:"border-box" },
//   card:         { background:"#fff", border:"2px solid #111", boxShadow:"5px 5px 0 #111", width:"100%" },
//   header:       { display:"grid", gridTemplateColumns:"1fr auto", borderBottom:"2px solid #111" },
//   headerTitle:  { padding:"14px 20px", borderRight:"2px solid #111" },
//   headerH1:     { fontSize:22, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", margin:0, color:"#111" },
//   headerSub:    { fontSize:13, fontWeight:500, color:"#444", marginTop:2, marginBottom:0 },
//   headerLogo:   { padding:"14px 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" },
//   logoText:     { fontSize:22, fontWeight:800, letterSpacing:"0.06em", color:"#111" },
//   logoSub:      { fontSize:11, color:"#666", fontStyle:"italic", marginTop:2 },
//   sectionLabel: { background:"#111", color:"#fff", fontSize:11, fontWeight:700,
//                   letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px",
//                   display:"flex", alignItems:"center" },
//   fieldLabel:   { fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
//                   color:"#555", display:"block", marginBottom:4 },
//   fieldInput:   { fontFamily:"monospace", fontSize:14, fontWeight:500, border:"none",
//                   borderBottom:"1.5px solid #bbb", outline:"none", padding:"2px 0",
//                   width:"100%", background:"transparent", color:"#111", boxSizing:"border-box" },
//   table:        { width:"100%", borderCollapse:"collapse", tableLayout:"fixed" },
//   tableInput:   { fontFamily:"monospace", fontSize:13, border:"none",
//                   borderBottom:"1.5px solid #ccc", width:"100%", background:"transparent",
//                   outline:"none", padding:"2px 0", boxSizing:"border-box", color:"#111" },
//   formFooter:   { display:"flex", alignItems:"center", justifyContent:"space-between",
//                   padding:"16px 20px", borderTop:"2px solid #111", background:"#fafafa" },
//   formRef:      { fontSize:11, fontFamily:"monospace", color:"#888" },
//   btnReset:     { background:"transparent", color:"#555", border:"1.5px solid #bbb",
//                   padding:"10px 20px", fontFamily:"inherit", fontSize:13, fontWeight:600,
//                   letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", marginRight:10 },
//   btnSubmit:    { background:"#111", color:"#fff", border:"none", padding:"10px 28px",
//                   fontFamily:"inherit", fontSize:13, fontWeight:700,
//                   letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
//   btnView:      { background:"#1a56db", color:"#fff", border:"none", padding:"10px 24px",
//                   fontFamily:"inherit", fontSize:13, fontWeight:700,
//                   letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
//   successBanner:{ background:"#d4edda", border:"1.5px solid #28a745", color:"#155724",
//                   padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16 },
//   errorBanner:  { background:"#f8d7da", border:"1.5px solid #dc3545", color:"#721c24",
//                   padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16 },
//   draftBanner:  { background:"#fef9c3", border:"1.5px solid #fde68a", color:"#854d0e",
//                   padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16,
//                   display:"flex", alignItems:"center", gap:10 },
//   loadingBanner:{ background:"#fff3cd", border:"1.5px solid #ffc107", color:"#856404",
//                   padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16 },
// };

// const MODEL_DATA = {
//   HHRA1004:{ component:"HHRA1004", issuedQty:"8000", issuedMaterialInvQty:"9000", customer:"HMSI", heatNo:"H123456" },
//   HHRA1005:{ component:"HHRA1005" },
//   HHRA1006:{ component:"HHRA1006", issuedQty:"7000", issuedMaterialInvQty:"8200", customer:"HMSI", heatNo:"M556677" },
//   HHRA1007:{ component:"HHRA1007" },
//   HHRA1008:{ component:"HHRA1008" }, 
//   HHRA1009:{ component:"HHRA1009" }, 
//   HSRA1004:{ component:"HSRA1004" }, 
//   HSRA1010:{ component:"HSRA1010" },
//   HSRA1011:{ component:"HSRA1011" },
//   HSRA1012:{ component:"HSRA1012" },
//   HSRA1013:{ component:"HSRA1013" },
//   HSRA1014:{ component:"HSRA1014" },
//   HSRA1019:{ component:"HSRA1019" },
//   HSRA1020:{ component:"HSRA1020" },
//   HSRA1021:{ component:"HSRA1021" },
//   HSRA1032:{ component:"HSRA1032" }, 
//   HSRA1033:{ component:"HSRA1033" },
//   HSRA1036:{ component:"HSRA1036" },
//   HSRA1037:{ component:"HSRA1037" },
// };

// const cell = (last=false, span2=false) => ({
//   padding:"10px 12px", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc",
//   display:"flex", flexDirection:"column", boxSizing:"border-box", gridColumn:span2?"span 2":undefined,
// });
// const thStyle = (last=false) => ({
//   background:"#f5f5f5", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
//   padding:"8px 12px", textAlign:"left", borderRight:last?"none":"1px solid #ccc",
//   borderBottom:"1px solid #ccc", color:"#333",
// });
// const tdStyle = (last=false) => ({
//   padding:"8px 12px", borderRight:last?"none":"1px solid #eee", borderBottom:"1px solid #eee",
// });
// const asmCell = (last=false) => ({
//   padding:"8px 12px", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc",
//   display:"flex", flexDirection:"column", boxSizing:"border-box",
// });

// const initialState = {
//   routeCardNo:"", startDate:"", endDate:"", component:"", issuedMaterialInvNo:"",
//   issuedQty:"", issuedMaterialInvDate:"", customer:"", issuedMaterialInvQty:"", heatNo:"",
//   softMachiningOkQty:"", softMachiningRewQty:"", softMachiningRejQty:"", softMachiningDate:"", softMachiningSign:"",
//   htOkQty:"", htRewQty:"", htRejQty:"", htDate:"", htSign:"", htChargeNo:"", htChargeDate:"",
//   hardMachiningOkQty:"", hardMachiningRewQty:"", hardMachiningRejQty:"", hardMachiningDate:"", hardMachiningSign:"",
//   cleaningOkQty:"", cleaningRewQty:"", cleaningRejQty:"", cleaningDate:"", cleaningSign:"",
//   screwInvNo:"", screwInvDate:"", screwIssuedQty:"",
//   nutInvNo:"", nutInvDate:"", nutIssuedQty:"",
//   bearingInvNo:"", bearingInvDate:"", bearingIssuedQty:"",
//   bearingShaftInvNo:"", shaftInvDate:"", shaftIssuedQty:"",
//   shellBearingInvNo:"", shellBearingInvDate:"",
//   assemblyOkQty:"", assemblyRewQty:"", assemblyRejQty:"", assemblyDate:"", assemblySign:"",
//   despatchInvoiceNo:"", despatchInvDate:"",
// };

// const ALL_COLS = [
//   { key:"Timestamp",            label:"Timestamp" },
//   { key:"Model",                label:"Model" },
//   { key:"routeCardNo",          label:"Route Card No" },
//   { key:"startDate",            label:"Start Date" },
//   { key:"endDate",              label:"End Date" },
//   { key:"component",            label:"Component" },
//   { key:"issuedMaterialInvNo",  label:"Issued Material Inv No" },
//   { key:"issuedQty",            label:"Issued Qty" },
//   { key:"issuedMaterialInvDate",label:"Issued Material Inv Date" },
//   { key:"customer",             label:"Customer" },
//   { key:"issuedMaterialInvQty", label:"Issued Material Inv Qty" },
//   { key:"heatNo",               label:"Heat No" },
//   { key:"softMachiningOkQty",   label:"Soft Machining OK Qty" },
//   { key:"softMachiningRewQty",  label:"Soft Machining Rew Qty" },
//   { key:"softMachiningRejQty",  label:"Soft Machining Rej Qty" },
//   { key:"softMachiningDate",    label:"Soft Machining Date" },
//   { key:"softMachiningSign",    label:"Soft Machining Sign" },
//   { key:"htOkQty",              label:"HT OK Qty" },
//   { key:"htRewQty",             label:"HT Rew Qty" },
//   { key:"htRejQty",             label:"HT Rej Qty" },
//   { key:"htDate",               label:"HT Date" },
//   { key:"htSign",               label:"HT Sign" },
//   { key:"htChargeNo",           label:"HT Charge No" },
//   { key:"htChargeDate",         label:"HT Charge Date" },
//   { key:"hardMachiningOkQty",   label:"Hard Machining OK Qty" },
//   { key:"hardMachiningRewQty",  label:"Hard Machining Rew Qty" },
//   { key:"hardMachiningRejQty",  label:"Hard Machining Rej Qty" },
//   { key:"hardMachiningDate",    label:"Hard Machining Date" },
//   { key:"hardMachiningSign",    label:"Hard Machining Sign" },
//   { key:"cleaningOkQty",        label:"Cleaning OK Qty" },
//   { key:"cleaningRewQty",       label:"Cleaning Rew Qty" },
//   { key:"cleaningRejQty",       label:"Cleaning Rej Qty" },
//   { key:"cleaningDate",         label:"Cleaning Date" },
//   { key:"cleaningSign",         label:"Cleaning Sign" },
//   { key:"screwInvNo",           label:"Screw Inv No" },
//   { key:"screwInvDate",         label:"Screw Inv Date" },
//   { key:"screwIssuedQty",       label:"Screw Issued Qty" },
//   { key:"nutInvNo",             label:"Nut Inv No" },
//   { key:"nutInvDate",           label:"Nut Inv Date" },
//   { key:"nutIssuedQty",         label:"Nut Issued Qty" },
//   { key:"bearingInvNo",         label:"Bearing Inv No" },
//   { key:"bearingInvDate",       label:"Bearing Inv Date" },
//   { key:"bearingIssuedQty",     label:"Bearing Issued Qty" },
//   { key:"bearingShaftInvNo",    label:"Bearing Shaft Inv No" },
//   { key:"shaftInvDate",         label:"Shaft Inv Date" },
//   { key:"shaftIssuedQty",       label:"Shaft Issued Qty" },
//   { key:"shellBearingInvNo",    label:"Shell Bearing Inv No" },
//   { key:"shellBearingInvDate",  label:"Shell Bearing Inv Date" },
//   { key:"assemblyOkQty",        label:"Assembly OK Qty" },
//   { key:"assemblyRewQty",       label:"Assembly Rew Qty" },
//   { key:"assemblyRejQty",       label:"Assembly Rej Qty" },
//   { key:"assemblyDate",         label:"Assembly Date" },
//   { key:"assemblySign",         label:"Assembly Sign" },
//   { key:"despatchInvoiceNo",    label:"Despatch Invoice No" },
//   { key:"despatchInvDate",      label:"Despatch Inv Date" },
// ];

// function normalizeCard(rawCard) {
//   const stripped = {};
//   Object.entries(rawCard).forEach(([k, v]) => {
//     stripped[k.toLowerCase().replace(/[^a-z0-9]/g, "")] = v;
//   });
//   const result = {};
//   ALL_COLS.forEach(({ key }) => {
//     const s = key.toLowerCase().replace(/[^a-z0-9]/g, "");
//     result[key] = rawCard[key] ?? rawCard[key[0].toUpperCase() + key.slice(1)] ?? stripped[s] ?? "";
//   });
//   return result;
// }

// // ─────────────────────────────────────────────
// //  VIEW ALL CARDS PAGE  (with pagination)
// // ─────────────────────────────────────────────
// function ViewAllCards({ onBack }) {
//   const [cards,     setCards]    = useState([]);
//   const [rawKeys,   setRawKeys]  = useState([]);
//   const [loading,   setLoading]  = useState(true);
//   const [error,     setError]    = useState("");
//   const [search,    setSearch]   = useState("");
//   const [showDebug, setShowDebug]= useState(false);
//   const [page,      setPage]     = useState(1);
//   const scrollRef = useRef(null);

//   const PAGE_SIZE = 5;

//   useEffect(() => {
//     fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`, { method: "GET" })
//       .then(r => r.json())
//       .then(res => {
//         if (res.status === "success" && Array.isArray(res.data)) {
//           if (res.data.length > 0) setRawKeys(Object.keys(res.data[0]));
//           setCards(res.data.map(normalizeCard).reverse());
//         } else {
//           setError("Could not load cards: " + (res.message || "Unknown error"));
//         }
//       })
//       .catch(err => setError(
//         "Cannot reach Google Sheets.\n1. URL ends with /exec\n2. Access = Anyone\n3. Redeployed after changes\n\nError: " + err.message
//       ))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const filtered = cards.filter(c =>
//     ALL_COLS.some(({ key }) => String(c[key] ?? "").toLowerCase().includes(search.toLowerCase()))
//   );

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const safePage   = Math.min(page, totalPages);
//   const startIdx   = (safePage - 1) * PAGE_SIZE;
//   const pageCards  = filtered.slice(startIdx, startIdx + PAGE_SIZE);

//   const getPageNums = () => {
//     if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
//     const set = new Set(
//       [1, totalPages, safePage, safePage - 1, safePage + 1].filter(n => n >= 1 && n <= totalPages)
//     );
//     const sorted = [...set].sort((a, b) => a - b);
//     const result = [];
//     sorted.forEach((n, i) => {
//       if (i > 0 && n - sorted[i - 1] > 1) result.push("…");
//       result.push(n);
//     });
//     return result;
//   };

//   const goTo = (p) => {
//     setPage(p);
//     scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const STICKY = 2;
//   const CW     = 150;

//   const btnPage = (active) => ({
//     padding: "6px 11px", fontSize: 12, fontWeight: active ? 700 : 400,
//     border: active ? "2px solid #111" : "1.5px solid #ccc",
//     background: active ? "#111" : "#fff", color: active ? "#fff" : "#333",
//     cursor: active ? "default" : "pointer", borderRadius: 4, minWidth: 32,
//     fontFamily: "inherit",
//   });

//   return (
//     <div style={S.wrapper}>
//       <style>{`
//         .stw::-webkit-scrollbar{display:none}
//         .stw{-ms-overflow-style:none;scrollbar-width:none}
//         .vrow:hover td{background:#fffde7!important}
//         .dbg{background:#1a1a1a;color:#4ade80;font-family:monospace;font-size:11px;
//              padding:14px 16px;margin-bottom:14px;white-space:pre-wrap;word-break:break-all;
//              max-height:160px;overflow-y:auto;border:1.5px solid #333}
//         .pgbtn:hover{background:#f5f5f5!important}
//       `}</style>

//       {/* Top bar */}
//       <div ref={scrollRef} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
//         <div>
//           <h2 style={{ margin:0, fontSize:20, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase" }}>
//             All Route Cards
//           </h2>
//           <div style={{ fontSize:11, color:"#888", marginTop:4 }}>
//             {ALL_COLS.length} columns · Timestamp &amp; Model pinned
//           </div>
//         </div>
//         <div style={{ display:"flex", gap:8 }}>
//           <button
//             style={{ ...S.btnReset, fontSize:11, padding:"7px 14px", marginRight:0 }}
//             onClick={() => setShowDebug(d => !d)}>
//             {showDebug ? "Hide Debug" : "🔍 Debug Keys"}
//           </button>
//           <button style={{ ...S.btnReset, marginRight:0 }} onClick={onBack}>← Back to Form</button>
//         </div>
//       </div>

//       {showDebug && (
//         <div className="dbg">
//           {rawKeys.length > 0
//             ? `Raw keys (${rawKeys.length}):\n${rawKeys.join(" | ")}`
//             : "No data received yet."}
//         </div>
//       )}

//       <input
//         type="text"
//         placeholder="Search across all fields…"
//         value={search}
//         onChange={handleSearch}
//         style={{
//           width:"100%", padding:"10px 14px", fontSize:14, border:"2px solid #111",
//           fontFamily:"inherit", marginBottom:16, boxSizing:"border-box", outline:"none",
//         }}
//       />

//       {loading && <div style={S.loadingBanner}>⏳ Loading from Google Sheets…</div>}
//       {error   && <div style={{ ...S.errorBanner, whiteSpace:"pre-line" }}>✕ {error}</div>}

//       {!loading && !error && (
//         <>
//           {/* Summary */}
//           <div style={{ fontSize:12, color:"#888", marginBottom:10, display:"flex", alignItems:"center", gap:12 }}>
//             <span>
//               Showing{" "}
//               <strong style={{ color:"#111" }}>
//                 {filtered.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + PAGE_SIZE, filtered.length)}
//               </strong>{" "}
//               of <strong style={{ color:"#111" }}>{filtered.length}</strong> records
//             </span>
//             <span style={{ background:"#111", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 8px", letterSpacing:"0.08em" }}>
//               {ALL_COLS.length} COLS
//             </span>
//             <span style={{ background:"#e0f2fe", color:"#0369a1", fontSize:10, fontWeight:700, padding:"2px 8px", letterSpacing:"0.08em" }}>
//               PAGE {safePage} / {totalPages}
//             </span>
//           </div>

//           {/* Table */}
//           <div className="stw"
//                style={{ overflowX:"auto", border:"2px solid #111", boxShadow:"5px 5px 0 #111", marginBottom:16 }}>
//             <table style={{ borderCollapse:"collapse", minWidth: ALL_COLS.length * CW, tableLayout:"fixed" }}>
//               <thead>
//                 <tr>
//                   {ALL_COLS.map(({ key, label }, i) => (
//                     <th key={key} style={{
//                       background: i < STICKY ? "#000" : "#111",
//                       color:"#fff", fontSize:10, fontWeight:700, letterSpacing:"0.08em",
//                       textTransform:"uppercase", padding:"9px 12px", textAlign:"left",
//                       whiteSpace:"nowrap",
//                       borderRight: i < ALL_COLS.length - 1 ? "1px solid #333" : "none",
//                       position: i < STICKY ? "sticky" : "static",
//                       left: i === 0 ? 0 : i === 1 ? CW : undefined,
//                       zIndex: i < STICKY ? 3 : 1,
//                       minWidth: CW, width: CW,
//                       boxShadow: i === STICKY - 1 ? "3px 0 8px rgba(0,0,0,0.2)" : "none",
//                     }}>
//                       {label}
//                       {i < STICKY && (
//                         <span style={{ display:"block", fontSize:8, color:"#aaa", fontStyle:"italic", fontWeight:400, marginTop:1 }}>
//                           PINNED
//                         </span>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {pageCards.length === 0 ? (
//                   <tr>
//                     <td colSpan={ALL_COLS.length}
//                         style={{ padding:32, textAlign:"center", color:"#888", fontSize:13 }}>
//                       No route cards found.
//                     </td>
//                   </tr>
//                 ) : (
//                   pageCards.map((card, i) => {
//                     const bg = i % 2 === 0 ? "#fff" : "#f9f9f9";
//                     return (
//                       <tr key={startIdx + i} className="vrow">
//                         {ALL_COLS.map(({ key }, j) => {
//                           const val   = card[key];
//                           const empty = val === "" || val === null || val === undefined;
//                           return (
//                             <td key={key} style={{
//                               padding:"8px 12px", fontSize:12, fontFamily:"monospace",
//                               borderBottom:"1px solid #eee",
//                               borderRight: j < ALL_COLS.length - 1 ? "1px solid #eee" : "none",
//                               whiteSpace:"nowrap", color: empty ? "#ccc" : "#111",
//                               position: j < STICKY ? "sticky" : "static",
//                               left: j === 0 ? 0 : j === 1 ? CW : undefined,
//                               background: bg, zIndex: j < STICKY ? 1 : 0,
//                               boxShadow: j === STICKY - 1 ? "3px 0 8px rgba(0,0,0,0.08)" : "none",
//                               minWidth: CW, width: CW,
//                             }}>
//                               {empty ? "—" : String(val)}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* ── PAGINATION CONTROLS ── */}
//           {totalPages > 1 && (
//             <div style={{
//               display:"flex", alignItems:"center", justifyContent:"space-between",
//               padding:"14px 0", borderTop:"2px solid #111",
//             }}>
//               {/* Prev */}
//               <button
//                 className="pgbtn"
//                 disabled={safePage === 1}
//                 onClick={() => goTo(safePage - 1)}
//                 style={{
//                   ...btnPage(false),
//                   opacity: safePage === 1 ? 0.35 : 1,
//                   cursor: safePage === 1 ? "not-allowed" : "pointer",
//                 }}>
//                 ← Prev
//               </button>

//               {/* Page numbers */}
//               <div style={{ display:"flex", alignItems:"center", gap:4 }}>
//                 {getPageNums().map((n, idx) =>
//                   n === "…" ? (
//                     <span key={`ell-${idx}`} style={{ padding:"0 4px", color:"#aaa", fontSize:12 }}>…</span>
//                   ) : (
//                     <button
//                       key={n}
//                       className={n !== safePage ? "pgbtn" : ""}
//                       onClick={() => goTo(n)}
//                       style={btnPage(n === safePage)}>
//                       {n}
//                     </button>
//                   )
//                 )}
//               </div>

//               {/* Next */}
//               <button
//                 className="pgbtn"
//                 disabled={safePage === totalPages}
//                 onClick={() => goTo(safePage + 1)}
//                 style={{
//                   ...btnPage(false),
//                   opacity: safePage === totalPages ? 0.35 : 1,
//                   cursor: safePage === totalPages ? "not-allowed" : "pointer",
//                 }}>
//                 Next →
//               </button>
//             </div>
//           )}

//           {/* Single page note */}
//           {totalPages === 1 && filtered.length > 0 && (
//             <div style={{ fontSize:11, color:"#bbb", textAlign:"center", padding:"10px 0", borderTop:"1px solid #eee" }}>
//               All {filtered.length} record{filtered.length !== 1 ? "s" : ""} on one page
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  MAIN ROUTECARD COMPONENT
// // ─────────────────────────────────────────────
// const Routecard = () => {
//   const [form,          setForm]         = useState(initialState);
//   const [selectedModel, setSelectedModel]= useState("");
//   const [search,        setSearch]       = useState("");
//   const [shaking,       setShaking]      = useState(false);
//   const [searchError,   setSearchError]  = useState(false);
//   const [showSug,       setShowSug]      = useState(false);
//   const [submitting,    setSubmitting]   = useState(false);
//   const [submitSuccess, setSubmitSuccess]= useState(false);
//   const [submitError,   setSubmitError]  = useState("");
//   const [draftSaved,    setDraftSaved]   = useState(false);
//   const [page,          setPage]         = useState("form");

//   const allModels      = Object.keys(MODEL_DATA);
//   const filteredModels = allModels.filter(m => m.toLowerCase().includes(search.toLowerCase()));

//   const openModel = (model) => {
//     setSelectedModel(model);
//     setForm({ ...initialState, ...MODEL_DATA[model] });
//     setSearch(model);
//     setShowSug(false);
//     setSearchError(false);
//     setSubmitSuccess(false);
//     setSubmitError("");
//     setDraftSaved(false);
//   };

//   const triggerShake = () => {
//     setShaking(true); setSearchError(true);
//     setTimeout(() => setShaking(false), 500);
//   };

//   const handleSearchChange = (e) => {
//     const val = e.target.value;
//     setSearch(val); setSearchError(false); setShowSug(val.length > 0);
//     const exact = allModels.find(m => m.toLowerCase() === val.toLowerCase());
//     if (exact) openModel(exact);
//   };

//   const handleSearchKeyDown = (e) => {
//     if (e.key === "Enter") {
//       const exact = allModels.find(m => m.toLowerCase() === search.toLowerCase());
//       if (exact) openModel(exact);
//       else if (filteredModels.length === 1) openModel(filteredModels[0]);
//       else triggerShake();
//     }
//     if (e.key === "Escape") setShowSug(false);
//   };

//   const handleModelSelect = (e) => {
//     const m = e.target.value;
//     if (m) openModel(m);
//     else { setSelectedModel(""); setForm(initialState); setSearch(""); }
//   };

//   const handleChange = useCallback((e) => {
//     const field = e.target.getAttribute("data-field");
//     setForm(prev => ({ ...prev, [field]: e.target.value }));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const hasEmpty = ALL_FIELDS_FLAT.some(f => String(form[f] ?? "").trim() === "");
//     if (hasEmpty) {
//       saveToDraft(form, selectedModel);
//       setSubmitError("");
//       setDraftSaved(true);
//       setTimeout(() => setDraftSaved(false), 6000);
//       return;
//     }
//     setSubmitting(true);
//     setSubmitSuccess(false);
//     setSubmitError("");
//     try {
//       await submitToSheet(form, selectedModel);
//       setSubmitSuccess(true);
//       setTimeout(() => setSubmitSuccess(false), 5000);
//     } catch (err) {
//       setSubmitError("Submit failed. Check your Apps Script URL and redeploy.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setForm(selectedModel && MODEL_DATA[selectedModel]
//       ? { ...initialState, ...MODEL_DATA[selectedModel] }
//       : initialState);
//     setSubmitSuccess(false); setSubmitError(""); setDraftSaved(false);
//   };

//   const inp  = (field, ph="", type="text") => (
//     <input style={S.fieldInput} type={type} data-field={field} value={form[field]} onChange={handleChange} placeholder={ph} />
//   );
//   const tinp = (field, ph="", type="text") => (
//     <input style={S.tableInput} type={type} data-field={field} value={form[field]} onChange={handleChange} placeholder={ph} />
//   );
//   const lbl  = (text) => <span style={S.fieldLabel}>{text}</span>;

//   const SectionLabel = ({ letter, title }) => (
//     <div style={S.sectionLabel}>
//       <span>{letter} — {title}</span>
//       <StatusLight form={form} section={letter} />
//     </div>
//   );

//   if (page === "view") return <ViewAllCards onBack={() => setPage("form")} />;

//   return (
//     <div style={S.wrapper}>
//       <style>{`
//         @keyframes shake {
//           0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}
//           30%{transform:translateX(8px)}45%{transform:translateX(-5px)}
//           60%{transform:translateX(5px)}75%{transform:translateX(-3px)}90%{transform:translateX(3px)}
//         }
//         .shake{animation:shake 0.45s ease}
//         .sug-item{padding:9px 14px;font-size:13px;font-family:monospace;font-weight:600;
//                   border-bottom:1px solid #eee;color:#111;cursor:pointer}
//         .sug-item:hover{background:#f5f5f5}
//       `}</style>

//       {/* TOP BAR */}
//       <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
//         <button style={S.btnView} onClick={() => setPage("view")}>📋 View All Saved Cards</button>
//       </div>

//       {/* MODEL SELECTOR */}
//       <div style={{ background:"#fff", border:"2px solid #111", boxShadow:"5px 5px 0 #111", padding:"24px 28px", marginBottom:28 }}>
//         <div style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#555", marginBottom:16 }}>
//           Select Model to Open Route Card
//         </div>
//         <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"flex-start" }}>

//           {/* Search */}
//           <div style={{ position:"relative", flex:1, minWidth:220 }}>
//             <div className={shaking ? "shake" : ""} style={{
//               display:"flex", alignItems:"center", gap:8,
//               border:`2px solid ${searchError ? "#e53e3e" : "#bbb"}`,
//               padding:"8px 12px",
//               background: searchError ? "#fff5f5" : "#fafafa",
//               transition:"border-color 0.2s,background 0.2s",
//             }}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30 30" fill={searchError ? "#e53e3e" : "#888"}>
//                 <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Type model & press Enter…"
//                 value={search}
//                 onChange={handleSearchChange}
//                 onKeyDown={handleSearchKeyDown}
//                 onFocus={() => search.length > 0 && setShowSug(true)}
//                 onBlur={() => setTimeout(() => setShowSug(false), 160)}
//                 style={{
//                   border:"none", outline:"none", background:"transparent", fontSize:14,
//                   color: searchError ? "#e53e3e" : "#111", width:"100%",
//                   fontFamily:"inherit", fontWeight:500,
//                 }}
//               />
//               {search && (
//                 <span
//                   onMouseDown={() => { setSearch(""); setSearchError(false); setShowSug(false); setSelectedModel(""); setForm(initialState); }}
//                   style={{ cursor:"pointer", color:"#aaa", fontSize:16, userSelect:"none", lineHeight:1 }}>
//                   ✕
//                 </span>
//               )}
//             </div>
//             {searchError && (
//               <div style={{ fontSize:11, color:"#e53e3e", marginTop:5, fontWeight:700 }}>
//                 ✕ Model not found — try HHRA or HSRA
//               </div>
//             )}
//             {showSug && filteredModels.length > 0 && (
//               <div style={{
//                 position:"absolute", top:"calc(100% + 2px)", left:0, right:0, zIndex:200,
//                 border:"2px solid #111", background:"#fff", boxShadow:"4px 4px 0 #111",
//                 maxHeight:200, overflowY:"auto",
//               }}>
//                 {filteredModels.map(m => (
//                   <div key={m} className="sug-item" onMouseDown={() => openModel(m)}>{m}</div>
//                 ))}
//               </div>
//             )}
//             {showSug && filteredModels.length === 0 && (
//               <div style={{
//                 position:"absolute", top:"calc(100% + 2px)", left:0, right:0, zIndex:200,
//                 border:"2px solid #e53e3e", background:"#fff5f5", padding:"10px 14px",
//                 fontSize:12, color:"#e53e3e", fontWeight:700,
//               }}>
//                 No matching model found
//               </div>
//             )}
//           </div>

//           <div style={{ display:"flex", alignItems:"center", color:"#bbb", fontSize:12, fontWeight:700, paddingTop:10 }}>OR</div>

//           <select
//             value={selectedModel}
//             onChange={handleModelSelect}
//             style={{
//               padding:"10px 16px", border:"2px solid #111", fontSize:14, fontFamily:"inherit",
//               fontWeight:600, background:"#fff", cursor:"pointer", minWidth:220, outline:"none", height:44,
//             }}>
//             <option value="">-- Select from list --</option>
//             {allModels.map(m => <option key={m} value={m}>{m}</option>)}
//           </select>
//         </div>

//         {!selectedModel && (
//           <div style={{ marginTop:14, fontSize:12, color:"#999", fontStyle:"italic" }}>
//             Type a model name or pick from the dropdown — the Route Card opens automatically.
//           </div>
//         )}
//         {selectedModel && (
//           <div style={{
//             marginTop:14, display:"inline-flex", alignItems:"center", gap:8,
//             background:"#111", color:"#fff", padding:"5px 14px", fontSize:12,
//             fontWeight:700, letterSpacing:"0.08em",
//           }}>
//             <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
//             LOADED: {selectedModel}
//           </div>
//         )}
//       </div>

//       {/* ROUTE CARD FORM */}
//       {selectedModel && (
//         <>
//           {submitSuccess && <div style={S.successBanner}>✓ Route Card saved to Google Sheets successfully!</div>}
//           {submitError   && <div style={S.errorBanner}>✕ {submitError}</div>}
//           {draftSaved    && (
//             <div style={S.draftBanner}>
//               📋 Some fields were empty — saved as a <strong>Draft</strong>.
//               Go to <em>Drafts</em> in the navbar to complete &amp; submit.
//             </div>
//           )}

//           <form style={S.card} onSubmit={handleSubmit}>

//             {/* Header */}
//             <div style={S.header}>
//               <div style={S.headerTitle}>
//                 <h1 style={S.headerH1}>Route Card</h1>
//                 <p style={S.headerSub}>Roller Rocker Arm — <strong>{selectedModel}</strong></p>
//               </div>
//               <div style={S.headerLogo}>
//                 <div style={S.logoText}>SANSERA</div>
//                 <div style={S.logoSub}>ideas@work</div>
//               </div>
//             </div>

//             {/* A — Store Use */}
//             <SectionLabel letter="A" title="Store Use" />
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
//               <div style={cell()}>{lbl("Route Card No.")}{inp("routeCardNo")}</div>
//               <div style={cell()}>{lbl("Start Date")}{inp("startDate","","date")}</div>
//               <div style={cell()}>{lbl("End Date")}{inp("endDate","","date")}</div>
//               <div style={cell(true)} />
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
//               <div style={cell(false,true)}>{lbl("Component")}{inp("component")}</div>
//               <div style={cell()}>{lbl("Issued Material Inv. No.")}{inp("issuedMaterialInvNo")}</div>
//               <div style={cell(true)} />
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
//               <div style={cell()}>{lbl("Issued Qty.")}{inp("issuedQty")}</div>
//               <div style={cell()} />
//               <div style={cell()}>{lbl("Issued Material Inv. Date")}{inp("issuedMaterialInvDate","","date")}</div>
//               <div style={cell(true)} />
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
//               <div style={cell()}>{lbl("Customer")}{inp("customer")}</div>
//               <div style={cell()} />
//               <div style={cell()}>{lbl("Issued Material Inv. Qty.")}{inp("issuedMaterialInvQty")}</div>
//               <div style={cell(true)} />
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
//               <div style={cell()}>{lbl("Heat No.")}{inp("heatNo")}</div>
//               <div style={cell()} /><div style={cell()} /><div style={cell(true)} />
//             </div>

//             {/* B — Machine Shop Use */}
//             <SectionLabel letter="B" title="Machine Shop Use" />
//             <table style={S.table}>
//               <thead><tr>
//                 <th style={{...thStyle(), width:"22%"}}>Operation</th>
//                 <th style={thStyle()}>OK Qty.</th>
//                 <th style={thStyle()}>Rew. Qty.</th>
//                 <th style={thStyle()}>Rej. Qty.</th>
//                 <th style={thStyle()}>Date</th>
//                 <th style={thStyle(true)}>Sign.</th>
//               </tr></thead>
//               <tbody><tr>
//                 <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Soft Machining</td>
//                 <td style={tdStyle()}>{tinp("softMachiningOkQty","0")}</td>
//                 <td style={tdStyle()}>{tinp("softMachiningRewQty","0")}</td>
//                 <td style={tdStyle()}>{tinp("softMachiningRejQty","0")}</td>
//                 <td style={tdStyle()}>{tinp("softMachiningDate","","date")}</td>
//                 <td style={tdStyle(true)}>{tinp("softMachiningSign","Signature")}</td>
//               </tr></tbody>
//             </table>

//             {/* C — HT Shop Use */}
//             <SectionLabel letter="C" title="HT Shop Use" />
//             <table style={S.table}>
//               <thead><tr>
//                 <th style={{...thStyle(), width:"22%"}}>Operation</th>
//                 <th style={thStyle()}>OK Qty.</th>
//                 <th style={thStyle()}>Rew. Qty.</th>
//                 <th style={thStyle()}>Rej. Qty.</th>
//                 <th style={thStyle()}>Date</th>
//                 <th style={thStyle(true)}>Sign.</th>
//               </tr></thead>
//               <tbody>
//                 <tr>
//                   <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Heat Treatment</td>
//                   <td style={tdStyle()}>{tinp("htOkQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("htRewQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("htRejQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("htDate","","date")}</td>
//                   <td style={tdStyle(true)}>{tinp("htSign","Signature")}</td>
//                 </tr>
//                 <tr>
//                   <td style={tdStyle()}>{lbl("HT Charge No.")}{tinp("htChargeNo","—")}</td>
//                   <td style={tdStyle()} colSpan={2} />
//                   <td style={tdStyle(true)} colSpan={3}>{lbl("HT Charge Date")}{tinp("htChargeDate","","date")}</td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* D — Machine Shop Use */}
//             <SectionLabel letter="D" title="Machine Shop Use" />
//             <table style={S.table}>
//               <thead><tr>
//                 <th style={{...thStyle(), width:"22%"}}>Operation</th>
//                 <th style={thStyle()}>OK Qty.</th>
//                 <th style={thStyle()}>Rew. Qty.</th>
//                 <th style={thStyle()}>Rej. Qty.</th>
//                 <th style={thStyle()}>Date</th>
//                 <th style={thStyle(true)}>Sign.</th>
//               </tr></thead>
//               <tbody>
//                 <tr>
//                   <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Hard Machining</td>
//                   <td style={tdStyle()}>{tinp("hardMachiningOkQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("hardMachiningRewQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("hardMachiningRejQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("hardMachiningDate","","date")}</td>
//                   <td style={tdStyle(true)}>{tinp("hardMachiningSign","Signature")}</td>
//                 </tr>
//                 <tr>
//                   <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Cleaning</td>
//                   <td style={tdStyle()}>{tinp("cleaningOkQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("cleaningRewQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("cleaningRejQty","0")}</td>
//                   <td style={tdStyle()}>{tinp("cleaningDate","","date")}</td>
//                   <td style={tdStyle(true)}>{tinp("cleaningSign","Signature")}</td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* E — Assembly Use */}
//             <SectionLabel letter="E" title="Assembly Use" />
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//               <div style={asmCell()}>{lbl("Screw Inv. No.")}{inp("screwInvNo","—")}</div>
//               <div style={asmCell()}>{lbl("Screw Inv. Date")}{inp("screwInvDate","","date")}</div>
//               <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("screwIssuedQty","0")}</div>
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//               <div style={asmCell()}>{lbl("Nut Inv. No.")}{inp("nutInvNo","—")}</div>
//               <div style={asmCell()}>{lbl("Nut Inv. Date")}{inp("nutInvDate","","date")}</div>
//               <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("nutIssuedQty","0")}</div>
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//               <div style={asmCell()}>{lbl("Bearing Inv. No.")}{inp("bearingInvNo","—")}</div>
//               <div style={asmCell()}>{lbl("Bearing Inv. Date")}{inp("bearingInvDate","","date")}</div>
//               <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("bearingIssuedQty","0")}</div>
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//               <div style={asmCell()}>{lbl("Bearing Shaft Inv. No.")}{inp("bearingShaftInvNo","—")}</div>
//               <div style={asmCell()}>{lbl("Shaft Inv. Date")}{inp("shaftInvDate","","date")}</div>
//               <div style={asmCell(true)}>{lbl("Issued Qty.")}{inp("shaftIssuedQty","0")}</div>
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
//               <div style={asmCell()}>{lbl("Shell Bearing Inv. No.")}{inp("shellBearingInvNo","—")}</div>
//               <div style={asmCell()}>{lbl("Shell Bearing Inv. Date")}{inp("shellBearingInvDate","","date")}</div>
//               <div style={asmCell(true)} />
//             </div>
//             <table style={S.table}>
//               <thead><tr>
//                 <th style={{...thStyle(), width:"22%"}}>Operation</th>
//                 <th style={thStyle()}>OK Qty.</th>
//                 <th style={thStyle()}>Rew. Qty.</th>
//                 <th style={thStyle()}>Rej. Qty.</th>
//                 <th style={thStyle()}>Date</th>
//                 <th style={thStyle(true)}>Sign.</th>
//               </tr></thead>
//               <tbody><tr>
//                 <td style={{...tdStyle(), fontSize:13, fontWeight:600, color:"#222"}}>Assembly</td>
//                 <td style={tdStyle()}>{tinp("assemblyOkQty","0")}</td>
//                 <td style={tdStyle()}>{tinp("assemblyRewQty","0")}</td>
//                 <td style={tdStyle()}>{tinp("assemblyRejQty","0")}</td>
//                 <td style={tdStyle()}>{tinp("assemblyDate","","date")}</td>
//                 <td style={tdStyle(true)}>{tinp("assemblySign","Signature")}</td>
//               </tr></tbody>
//             </table>

//             {/* F — Dispatch Use */}
//             <SectionLabel letter="F" title="Dispatch Use" />
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
//               <div style={cell()}>{lbl("Despatch Invoice No.")}{inp("despatchInvoiceNo","—")}</div>
//               <div style={cell(true)}>{lbl("Despatch Inv. Date")}{inp("despatchInvDate","","date")}</div>
//             </div>

//             {/* Footer */}
//             <div style={S.formFooter}>
//               <span style={S.formRef}>F760B/02</span>
//               <div>
//                 <button type="button" style={S.btnReset} onClick={handleReset}>Reset</button>
//                 <button
//                   type="submit"
//                   style={{ ...S.btnSubmit, ...(submitting ? { opacity:0.7, cursor:"not-allowed" } : {}) }}
//                   disabled={submitting}>
//                   {submitting ? "Saving…" : "Submit & Save to Sheet"}
//                 </button>
//               </div>
//             </div>

//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default Routecard;






import { useState, useCallback, useRef, useEffect } from "react";

// ─── Apps Script URL ──────────────────────────────────────────────────────────
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzXW8x6Xwbntn5VK9tB1lfsEXy6JmUhMnmXQSqJbojDCtNZ_myf9dS05hosWr-uGAI/exec";

export async function submitToSheet(formData, model) {
  const payload = JSON.stringify({ ...formData, model });
  const params = new URLSearchParams({ data: payload });
  await fetch(APPS_SCRIPT_URL, {
    method: "POST", mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
}

// ─── Route Card Number Series (localStorage) ──────────────────────────────────
// Format: HSRA10142026001, HSRA10142026002, …
function buildRcNo(model, seq) {
  return `${model}${new Date().getFullYear()}${String(seq).padStart(3, "0")}`;
}
function allocateRcNo(model) {
  const key = `rc_seq__${model}`;
  const next = (parseInt(localStorage.getItem(key) || "0", 10)) + 1;
  localStorage.setItem(key, String(next));
  return buildRcNo(model, next);
}
function peekSeq(model) {
  return parseInt(localStorage.getItem(`rc_seq__${model}`) || "0", 10);
}

// ─── Draft System (localStorage) ─────────────────────────────────────────────
const DRAFT_KEY = "routecard_drafts_v1";
function loadDrafts() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "[]"); }
  catch { return []; }
}
function upsertDraft(form, model) {
  const drafts = loadDrafts();
  const idx = drafts.findIndex(d => d.form.routeCardNo === form.routeCardNo);
  const entry = { model, form, savedAt: new Date().toISOString() };
  if (idx >= 0) drafts[idx] = entry; else drafts.push(entry);
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
}
function removeDraft(rcNo) {
  localStorage.setItem(DRAFT_KEY,
    JSON.stringify(loadDrafts().filter(d => d.form.routeCardNo !== rcNo)));
}

// ─── Field definitions ────────────────────────────────────────────────────────
// routeCardNo is AUTO — excluded from both empty-check and section status count
const ALL_FIELDS_FLAT = [
  "startDate","endDate","component","issuedMaterialInvNo",
  "issuedQty","issuedMaterialInvDate","customer","issuedMaterialInvQty","heatNo",
  "softMachiningOkQty","softMachiningRewQty","softMachiningRejQty","softMachiningDate","softMachiningSign",
  "htOkQty","htRewQty","htRejQty","htDate","htSign","htChargeNo","htChargeDate",
  "hardMachiningOkQty","hardMachiningRewQty","hardMachiningRejQty","hardMachiningDate","hardMachiningSign",
  "cleaningOkQty","cleaningRewQty","cleaningRejQty","cleaningDate","cleaningSign",
  "screwInvNo","screwInvDate","screwIssuedQty",
  "nutInvNo","nutInvDate","nutIssuedQty",
  "bearingInvNo","bearingInvDate","bearingIssuedQty",
  "bearingShaftInvNo","shaftInvDate","shaftIssuedQty",
  "shellBearingInvNo","shellBearingInvDate",
  "assemblyOkQty","assemblyRewQty","assemblyRejQty","assemblyDate","assemblySign",
  "despatchInvoiceNo","despatchInvDate",
];

const SECTION_FIELDS = {
  A: ["startDate","endDate","component","issuedMaterialInvNo",
      "issuedQty","issuedMaterialInvDate","customer","issuedMaterialInvQty","heatNo"],
  B: ["softMachiningOkQty","softMachiningRewQty","softMachiningRejQty","softMachiningDate","softMachiningSign"],
  C: ["htOkQty","htRewQty","htRejQty","htDate","htSign","htChargeNo","htChargeDate"],
  D: ["hardMachiningOkQty","hardMachiningRewQty","hardMachiningRejQty","hardMachiningDate","hardMachiningSign",
      "cleaningOkQty","cleaningRewQty","cleaningRejQty","cleaningDate","cleaningSign"],
  E: ["screwInvNo","screwInvDate","screwIssuedQty",
      "nutInvNo","nutInvDate","nutIssuedQty",
      "bearingInvNo","bearingInvDate","bearingIssuedQty",
      "bearingShaftInvNo","shaftInvDate","shaftIssuedQty",
      "shellBearingInvNo","shellBearingInvDate",
      "assemblyOkQty","assemblyRewQty","assemblyRejQty","assemblyDate","assemblySign"],
  F: ["despatchInvoiceNo","despatchInvDate"],
};

const MODEL_DATA = {
  HHRA1004:{ component:"HHRA1004", issuedQty:"8000", issuedMaterialInvQty:"9000", customer:"HMSI", heatNo:"H123456" },
  HHRA1005:{ component:"HHRA1005" }, HHRA1006:{ component:"HHRA1006", issuedQty:"7000", issuedMaterialInvQty:"8200", customer:"HMSI", heatNo:"M556677" },
  HHRA1007:{ component:"HHRA1007" }, HHRA1008:{ component:"HHRA1008" }, HHRA1009:{ component:"HHRA1009" },
  HSRA1004:{ component:"HSRA1004" }, HSRA1010:{ component:"HSRA1010" }, HSRA1011:{ component:"HSRA1011" },
  HSRA1012:{ component:"HSRA1012" }, HSRA1013:{ component:"HSRA1013" }, HSRA1014:{ component:"HSRA1014" },
  HSRA1019:{ component:"HSRA1019" }, HSRA1020:{ component:"HSRA1020" }, HSRA1021:{ component:"HSRA1021" },
  HSRA1032:{ component:"HSRA1032" }, HSRA1033:{ component:"HSRA1033" },
  HSRA1036:{ component:"HSRA1036" }, HSRA1037:{ component:"HSRA1037" },
};

const initialState = {
  routeCardNo:"", startDate:"", endDate:"", component:"", issuedMaterialInvNo:"",
  issuedQty:"", issuedMaterialInvDate:"", customer:"", issuedMaterialInvQty:"", heatNo:"",
  softMachiningOkQty:"", softMachiningRewQty:"", softMachiningRejQty:"", softMachiningDate:"", softMachiningSign:"",
  htOkQty:"", htRewQty:"", htRejQty:"", htDate:"", htSign:"", htChargeNo:"", htChargeDate:"",
  hardMachiningOkQty:"", hardMachiningRewQty:"", hardMachiningRejQty:"", hardMachiningDate:"", hardMachiningSign:"",
  cleaningOkQty:"", cleaningRewQty:"", cleaningRejQty:"", cleaningDate:"", cleaningSign:"",
  screwInvNo:"", screwInvDate:"", screwIssuedQty:"",
  nutInvNo:"", nutInvDate:"", nutIssuedQty:"",
  bearingInvNo:"", bearingInvDate:"", bearingIssuedQty:"",
  bearingShaftInvNo:"", shaftInvDate:"", shaftIssuedQty:"",
  shellBearingInvNo:"", shellBearingInvDate:"",
  assemblyOkQty:"", assemblyRewQty:"", assemblyRejQty:"", assemblyDate:"", assemblySign:"",
  despatchInvoiceNo:"", despatchInvDate:"",
};

const ALL_COLS = [
  { key:"Timestamp", label:"Timestamp" }, { key:"Model", label:"Model" },
  { key:"routeCardNo", label:"Route Card No" }, { key:"startDate", label:"Start Date" },
  { key:"endDate", label:"End Date" }, { key:"component", label:"Component" },
  { key:"issuedMaterialInvNo", label:"Issued Material Inv No" }, { key:"issuedQty", label:"Issued Qty" },
  { key:"issuedMaterialInvDate", label:"Issued Material Inv Date" }, { key:"customer", label:"Customer" },
  { key:"issuedMaterialInvQty", label:"Issued Material Inv Qty" }, { key:"heatNo", label:"Heat No" },
  { key:"softMachiningOkQty", label:"Soft Machining OK Qty" }, { key:"softMachiningRewQty", label:"Soft Machining Rew Qty" },
  { key:"softMachiningRejQty", label:"Soft Machining Rej Qty" }, { key:"softMachiningDate", label:"Soft Machining Date" },
  { key:"softMachiningSign", label:"Soft Machining Sign" }, { key:"htOkQty", label:"HT OK Qty" },
  { key:"htRewQty", label:"HT Rew Qty" }, { key:"htRejQty", label:"HT Rej Qty" },
  { key:"htDate", label:"HT Date" }, { key:"htSign", label:"HT Sign" },
  { key:"htChargeNo", label:"HT Charge No" }, { key:"htChargeDate", label:"HT Charge Date" },
  { key:"hardMachiningOkQty", label:"Hard Machining OK Qty" }, { key:"hardMachiningRewQty", label:"Hard Machining Rew Qty" },
  { key:"hardMachiningRejQty", label:"Hard Machining Rej Qty" }, { key:"hardMachiningDate", label:"Hard Machining Date" },
  { key:"hardMachiningSign", label:"Hard Machining Sign" }, { key:"cleaningOkQty", label:"Cleaning OK Qty" },
  { key:"cleaningRewQty", label:"Cleaning Rew Qty" }, { key:"cleaningRejQty", label:"Cleaning Rej Qty" },
  { key:"cleaningDate", label:"Cleaning Date" }, { key:"cleaningSign", label:"Cleaning Sign" },
  { key:"screwInvNo", label:"Screw Inv No" }, { key:"screwInvDate", label:"Screw Inv Date" },
  { key:"screwIssuedQty", label:"Screw Issued Qty" }, { key:"nutInvNo", label:"Nut Inv No" },
  { key:"nutInvDate", label:"Nut Inv Date" }, { key:"nutIssuedQty", label:"Nut Issued Qty" },
  { key:"bearingInvNo", label:"Bearing Inv No" }, { key:"bearingInvDate", label:"Bearing Inv Date" },
  { key:"bearingIssuedQty", label:"Bearing Issued Qty" }, { key:"bearingShaftInvNo", label:"Bearing Shaft Inv No" },
  { key:"shaftInvDate", label:"Shaft Inv Date" }, { key:"shaftIssuedQty", label:"Shaft Issued Qty" },
  { key:"shellBearingInvNo", label:"Shell Bearing Inv No" }, { key:"shellBearingInvDate", label:"Shell Bearing Inv Date" },
  { key:"assemblyOkQty", label:"Assembly OK Qty" }, { key:"assemblyRewQty", label:"Assembly Rew Qty" },
  { key:"assemblyRejQty", label:"Assembly Rej Qty" }, { key:"assemblyDate", label:"Assembly Date" },
  { key:"assemblySign", label:"Assembly Sign" }, { key:"despatchInvoiceNo", label:"Despatch Invoice No" },
  { key:"despatchInvDate", label:"Despatch Inv Date" },
];

function normalizeCard(rawCard) {
  const stripped = {};
  Object.entries(rawCard).forEach(([k,v]) => { stripped[k.toLowerCase().replace(/[^a-z0-9]/g,"")] = v; });
  const result = {};
  ALL_COLS.forEach(({ key }) => {
    const s = key.toLowerCase().replace(/[^a-z0-9]/g,"");
    result[key] = rawCard[key] ?? rawCard[key[0].toUpperCase()+key.slice(1)] ?? stripped[s] ?? "";
  });
  return result;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  wrap:   { width:"100%", maxWidth:900, margin:"32px auto", padding:"0 16px", fontFamily:"'Segoe UI',Arial,sans-serif", boxSizing:"border-box" },
  card:   { background:"#fff", border:"2px solid #111", boxShadow:"5px 5px 0 #111", width:"100%" },
  hdr:    { display:"grid", gridTemplateColumns:"1fr auto", borderBottom:"2px solid #111" },
  hdrL:   { padding:"14px 20px", borderRight:"2px solid #111" },
  h1:     { fontSize:22, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", margin:0, color:"#111" },
  sub:    { fontSize:13, fontWeight:500, color:"#444", marginTop:2, marginBottom:0 },
  hdrR:   { padding:"14px 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" },
  logo:   { fontSize:22, fontWeight:800, letterSpacing:"0.06em", color:"#111" },
  logoS:  { fontSize:11, color:"#666", fontStyle:"italic", marginTop:2 },
  secLbl: { background:"#111", color:"#fff", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px", display:"flex", alignItems:"center" },
  fldLbl: { fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#555", display:"block", marginBottom:4 },
  inp:    { fontFamily:"monospace", fontSize:14, fontWeight:500, border:"none", borderBottom:"1.5px solid #bbb", outline:"none", padding:"2px 0", width:"100%", background:"transparent", color:"#111", boxSizing:"border-box" },
  inpRO:  { fontFamily:"monospace", fontSize:14, fontWeight:700, border:"none", borderBottom:"2px solid #22c55e", outline:"none", padding:"2px 0", width:"100%", background:"#f0fdf4", color:"#166534", boxSizing:"border-box", cursor:"not-allowed" },
  tbl:    { width:"100%", borderCollapse:"collapse", tableLayout:"fixed" },
  tInp:   { fontFamily:"monospace", fontSize:13, border:"none", borderBottom:"1.5px solid #ccc", width:"100%", background:"transparent", outline:"none", padding:"2px 0", boxSizing:"border-box", color:"#111" },
  footer: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderTop:"2px solid #111", background:"#fafafa" },
  ref:    { fontSize:11, fontFamily:"monospace", color:"#888" },
  btnRst: { background:"transparent", color:"#555", border:"1.5px solid #bbb", padding:"10px 20px", fontFamily:"inherit", fontSize:13, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", marginRight:10 },
  btnSub: { background:"#111", color:"#fff", border:"none", padding:"10px 28px", fontFamily:"inherit", fontSize:13, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  btnVw:  { background:"#1a56db", color:"#fff", border:"none", padding:"10px 24px", fontFamily:"inherit", fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" },
  btnDr:  { background:"#854d0e", color:"#fff", border:"none", padding:"10px 24px", fontFamily:"inherit", fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", position:"relative" },
  ok:     { background:"#d4edda", border:"1.5px solid #28a745", color:"#155724", padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16 },
  err:    { background:"#f8d7da", border:"1.5px solid #dc3545", color:"#721c24", padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16 },
  drft:   { background:"#fef9c3", border:"1.5px solid #fde68a", color:"#854d0e", padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" },
  load:   { background:"#fff3cd", border:"1.5px solid #ffc107", color:"#856404", padding:"12px 20px", fontSize:13, fontWeight:600, marginBottom:16 },
};

const cell  = (last=false,span2=false) => ({ padding:"10px 12px", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc", display:"flex", flexDirection:"column", boxSizing:"border-box", gridColumn:span2?"span 2":undefined });
const th    = (last=false) => ({ background:"#f5f5f5", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", padding:"8px 12px", textAlign:"left", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc", color:"#333" });
const td    = (last=false) => ({ padding:"8px 12px", borderRight:last?"none":"1px solid #eee", borderBottom:"1px solid #eee" });
const aCell = (last=false) => ({ padding:"8px 12px", borderRight:last?"none":"1px solid #ccc", borderBottom:"1px solid #ccc", display:"flex", flexDirection:"column", boxSizing:"border-box" });

// ─── Status Light ─────────────────────────────────────────────────────────────
function StatusLight({ form, section }) {
  const fields = SECTION_FIELDS[section] || [];
  const filled = fields.filter(f => String(form[f] ?? "").trim() !== "").length;
  const total  = fields.length;
  const green  = filled === total;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6, marginLeft:10 }}>
      <span style={{ display:"inline-block", width:11, height:11, borderRadius:"50%",
        background:green?"#22c55e":"#ef4444",
        boxShadow:green?"0 0 0 2px rgba(34,197,94,0.3),0 0 8px rgba(34,197,94,0.7)":"0 0 0 2px rgba(239,68,68,0.3),0 0 8px rgba(239,68,68,0.7)",
        flexShrink:0, transition:"background 0.3s,box-shadow 0.3s" }} />
      <span style={{ fontSize:10, fontWeight:700, color:green?"#86efac":"#fca5a5", opacity:0.9 }}>
        {filled}/{total}
      </span>
    </span>
  );
}

// ─── RC Counter Panel ─────────────────────────────────────────────────────────
function RcCounterPanel({ models }) {
  const [seqs, setSeqs] = useState({});
  useEffect(() => {
    const r = {}; models.forEach(m => { r[m] = peekSeq(m); }); setSeqs(r);
  }, []);
  const yr = new Date().getFullYear();
  return (
    <div style={{ background:"#fff", border:"2px solid #111", boxShadow:"5px 5px 0 #111", padding:"20px 24px", marginBottom:28 }}>
      <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#555", marginBottom:14 }}>
        📊 Route Card Series — All Models ({yr})
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:8 }}>
        {models.map(m => {
          const s = seqs[m] || 0;
          return (
            <div key={m} style={{ border:"1.5px solid #e5e7eb", padding:"8px 12px", display:"flex", flexDirection:"column", gap:2 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#333" }}>{m}</span>
              <span style={{ fontSize:10, fontFamily:"monospace", color:"#22c55e", fontWeight:700 }}>Next → {buildRcNo(m, s+1)}</span>
              <span style={{ fontSize:10, color:"#aaa" }}>{s===0?"No cards yet":`${s} card${s!==1?"s":""} issued`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Drafts Page ──────────────────────────────────────────────────────────────
function DraftsPage({ onBack, onResume }) {
  const [drafts,     setDrafts]     = useState([]);
  const [confirmDel, setConfirmDel] = useState(null);

  const reload = () => setDrafts(loadDrafts().slice().reverse());
  useEffect(() => { reload(); }, []);

  const missingCount = (form) => ALL_FIELDS_FLAT.filter(f => String(form[f]??"").trim()==="").length;

  return (
    <div style={S.wrap}>
      <style>{`.dr:hover td{background:#fffde7!important}`}</style>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h2 style={{ margin:0, fontSize:20, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase" }}>Drafts</h2>
          <div style={{ fontSize:11, color:"#888", marginTop:4 }}>Incomplete route cards — Resume to finish &amp; submit to Google Sheets</div>
        </div>
        <button style={{ ...S.btnRst, marginRight:0 }} onClick={onBack}>← Back to Form</button>
      </div>

      {drafts.length===0 ? (
        <div style={{ border:"2px dashed #ccc", padding:"48px 20px", textAlign:"center", color:"#aaa", fontSize:14 }}>
          No drafts saved. Incomplete submissions are automatically saved here.
        </div>
      ) : (
        <div style={{ border:"2px solid #111", boxShadow:"5px 5px 0 #111" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#111" }}>
                {["Route Card No","Model","Saved At","Missing Fields","Actions"].map((h,i) => (
                  <th key={i} style={{ color:"#fff", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"10px 14px", textAlign:"left", borderRight:i<4?"1px solid #333":"none" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drafts.map((d,i) => {
                const miss = missingCount(d.form);
                return (
                  <tr key={d.form.routeCardNo} className="dr" style={{ background:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"10px 14px", fontFamily:"monospace", fontWeight:700, fontSize:13, color:"#166534", borderBottom:"1px solid #eee", borderRight:"1px solid #eee" }}>{d.form.routeCardNo}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, fontWeight:600, borderBottom:"1px solid #eee", borderRight:"1px solid #eee" }}>{d.model}</td>
                    <td style={{ padding:"10px 14px", fontSize:11, fontFamily:"monospace", color:"#888", borderBottom:"1px solid #eee", borderRight:"1px solid #eee" }}>{new Date(d.savedAt).toLocaleString()}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, borderBottom:"1px solid #eee", borderRight:"1px solid #eee" }}>
                      <span style={{ background:miss===0?"#d4edda":"#fff3cd", color:miss===0?"#155724":"#856404", padding:"2px 8px", fontSize:11, fontWeight:700 }}>
                        {miss===0?"✓ Complete":`${miss} fields missing`}
                      </span>
                    </td>
                    <td style={{ padding:"10px 14px", borderBottom:"1px solid #eee" }}>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        <button onClick={() => onResume(d)} style={{ background:"#111", color:"#fff", border:"none", padding:"6px 14px", fontSize:11, fontWeight:700, cursor:"pointer" }}>▶ Resume</button>
                        {confirmDel===d.form.routeCardNo ? (
                          <>
                            <button onClick={() => { removeDraft(d.form.routeCardNo); reload(); setConfirmDel(null); }}
                              style={{ background:"#dc3545", color:"#fff", border:"none", padding:"6px 12px", fontSize:11, fontWeight:700, cursor:"pointer" }}>Confirm</button>
                            <button onClick={() => setConfirmDel(null)}
                              style={{ background:"transparent", color:"#555", border:"1px solid #bbb", padding:"6px 12px", fontSize:11, cursor:"pointer" }}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => setConfirmDel(d.form.routeCardNo)}
                            style={{ background:"transparent", color:"#dc3545", border:"1px solid #dc3545", padding:"6px 12px", fontSize:11, fontWeight:700, cursor:"pointer" }}>✕ Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── View All Cards ───────────────────────────────────────────────────────────
function ViewAllCards({ onBack }) {
  const [cards,setCards]=useState([]); const [rawKeys,setRawKeys]=useState([]); const [loading,setLoading]=useState(true);
  const [error,setError]=useState(""); const [search,setSearch]=useState(""); const [showDbg,setShowDbg]=useState(false);
  const [page,setPage]=useState(1); const scrollRef=useRef(null); const PAGE=5;

  useEffect(() => {
    fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`,{method:"GET"}).then(r=>r.json()).then(res=>{
      if(res.status==="success"&&Array.isArray(res.data)){
        if(res.data.length>0) setRawKeys(Object.keys(res.data[0]));
        setCards(res.data.map(normalizeCard).reverse());
      } else setError("Could not load: "+(res.message||"Unknown error"));
    }).catch(e=>setError("Cannot reach Google Sheets.\nError: "+e.message)).finally(()=>setLoading(false));
  },[]);

  const filtered=cards.filter(c=>ALL_COLS.some(({key})=>String(c[key]??"").toLowerCase().includes(search.toLowerCase())));
  const total=Math.max(1,Math.ceil(filtered.length/PAGE));
  const safe=Math.min(page,total); const si=(safe-1)*PAGE;
  const pageCards=filtered.slice(si,si+PAGE);
  const pageNums=()=>{
    if(total<=7) return Array.from({length:total},(_,i)=>i+1);
    const set=new Set([1,total,safe,safe-1,safe+1].filter(n=>n>=1&&n<=total));
    const sorted=[...set].sort((a,b)=>a-b); const r=[];
    sorted.forEach((n,i)=>{if(i>0&&n-sorted[i-1]>1)r.push("…");r.push(n);}); return r;
  };
  const goTo=(p)=>{setPage(p);scrollRef.current?.scrollIntoView({behavior:"smooth",block:"start"});};
  const CW=150,STICKY=2;
  const bpStyle=(act)=>({padding:"6px 11px",fontSize:12,fontWeight:act?700:400,border:act?"2px solid #111":"1.5px solid #ccc",background:act?"#111":"#fff",color:act?"#fff":"#333",cursor:act?"default":"pointer",borderRadius:4,minWidth:32,fontFamily:"inherit"});

  return (
    <div style={S.wrap}>
      <style>{`.stw::-webkit-scrollbar{display:none}.stw{-ms-overflow-style:none;scrollbar-width:none}.vr:hover td{background:#fffde7!important}.pgb:hover{background:#f5f5f5!important}`}</style>
      <div ref={scrollRef} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase"}}>All Route Cards</h2>
          <div style={{fontSize:11,color:"#888",marginTop:4}}>{ALL_COLS.length} columns · Timestamp &amp; Model pinned</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={{...S.btnRst,fontSize:11,padding:"7px 14px",marginRight:0}} onClick={()=>setShowDbg(d=>!d)}>{showDbg?"Hide Debug":"🔍 Debug"}</button>
          <button style={{...S.btnRst,marginRight:0}} onClick={onBack}>← Back</button>
        </div>
      </div>
      {showDbg&&<div style={{background:"#1a1a1a",color:"#4ade80",fontFamily:"monospace",fontSize:11,padding:"14px",marginBottom:14,whiteSpace:"pre-wrap",maxHeight:160,overflowY:"auto"}}>{rawKeys.length>0?`Keys (${rawKeys.length}):\n${rawKeys.join(" | ")}`:"No data"}</div>}
      <input type="text" placeholder="Search all fields…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
        style={{width:"100%",padding:"10px 14px",fontSize:14,border:"2px solid #111",fontFamily:"inherit",marginBottom:16,boxSizing:"border-box",outline:"none"}}/>
      {loading&&<div style={S.load}>⏳ Loading from Google Sheets…</div>}
      {error&&<div style={{...S.err,whiteSpace:"pre-line"}}>✕ {error}</div>}
      {!loading&&!error&&(
        <>
          <div style={{fontSize:12,color:"#888",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <span>Showing <strong style={{color:"#111"}}>{filtered.length===0?0:si+1}–{Math.min(si+PAGE,filtered.length)}</strong> of <strong style={{color:"#111"}}>{filtered.length}</strong></span>
            <span style={{background:"#111",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px"}}>PAGE {safe}/{total}</span>
          </div>
          <div className="stw" style={{overflowX:"auto",border:"2px solid #111",boxShadow:"5px 5px 0 #111",marginBottom:16}}>
            <table style={{borderCollapse:"collapse",minWidth:ALL_COLS.length*CW,tableLayout:"fixed"}}>
              <thead><tr>
                {ALL_COLS.map(({key,label},i)=>(
                  <th key={key} style={{background:i<STICKY?"#000":"#111",color:"#fff",fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"9px 12px",textAlign:"left",whiteSpace:"nowrap",borderRight:i<ALL_COLS.length-1?"1px solid #333":"none",position:i<STICKY?"sticky":"static",left:i===0?0:i===1?CW:undefined,zIndex:i<STICKY?3:1,minWidth:CW,width:CW,boxShadow:i===STICKY-1?"3px 0 8px rgba(0,0,0,0.2)":"none"}}>
                    {label}{i<STICKY&&<span style={{display:"block",fontSize:8,color:"#aaa",fontStyle:"italic",fontWeight:400,marginTop:1}}>PINNED</span>}
                  </th>
                ))}
              </tr></thead>
              <tbody>
                {pageCards.length===0?<tr><td colSpan={ALL_COLS.length} style={{padding:32,textAlign:"center",color:"#888"}}>No cards found.</td></tr>:
                  pageCards.map((card,i)=>{const bg=i%2===0?"#fff":"#f9f9f9";return(
                    <tr key={si+i} className="vr">{ALL_COLS.map(({key},j)=>{const v=card[key];const e=v===""||v===null||v===undefined;return(
                      <td key={key} style={{padding:"8px 12px",fontSize:12,fontFamily:"monospace",borderBottom:"1px solid #eee",borderRight:j<ALL_COLS.length-1?"1px solid #eee":"none",whiteSpace:"nowrap",color:e?"#ccc":"#111",position:j<STICKY?"sticky":"static",left:j===0?0:j===1?CW:undefined,background:bg,zIndex:j<STICKY?1:0,boxShadow:j===STICKY-1?"3px 0 8px rgba(0,0,0,0.08)":"none",minWidth:CW,width:CW}}>{e?"—":String(v)}</td>
                    );})}</tr>
                  );}
                )}
              </tbody>
            </table>
          </div>
          {total>1&&<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderTop:"2px solid #111"}}>
            <button className="pgb" disabled={safe===1} onClick={()=>goTo(safe-1)} style={{...bpStyle(false),opacity:safe===1?0.35:1,cursor:safe===1?"not-allowed":"pointer"}}>← Prev</button>
            <div style={{display:"flex",gap:4}}>{pageNums().map((n,idx)=>n==="…"?<span key={`e${idx}`} style={{padding:"0 4px",color:"#aaa"}}>…</span>:<button key={n} className={n!==safe?"pgb":""} onClick={()=>goTo(n)} style={bpStyle(n===safe)}>{n}</button>)}</div>
            <button className="pgb" disabled={safe===total} onClick={()=>goTo(safe+1)} style={{...bpStyle(false),opacity:safe===total?0.35:1,cursor:safe===total?"not-allowed":"pointer"}}>Next →</button>
          </div>}
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Routecard = () => {
  const [form,         setForm]        = useState(initialState);
  const [model,        setModel]       = useState("");
  const [search,       setSearch]      = useState("");
  const [shaking,      setShaking]     = useState(false);
  const [searchErr,    setSearchErr]   = useState(false);
  const [showSug,      setShowSug]     = useState(false);
  const [submitting,   setSubmitting]  = useState(false);
  const [submitted,    setSubmitted]   = useState(false);
  const [submitErr,    setSubmitErr]   = useState("");
  const [draftSaved,   setDraftSaved]  = useState(false);
  const [page,         setPage]        = useState("form"); // "form"|"view"|"drafts"
  const [showCounters, setShowCounters]= useState(false);
  const [draftCount,   setDraftCount]  = useState(0);

  const allModels = Object.keys(MODEL_DATA);
  const filtered  = allModels.filter(m => m.toLowerCase().includes(search.toLowerCase()));

  const refreshCount = () => setDraftCount(loadDrafts().length);
  useEffect(() => { refreshCount(); }, []);

  // ── Open a model: allocate RC# immediately (synchronous localStorage) ───────
  const openModel = (m) => {
    const rcNo = allocateRcNo(m);           // increments counter right now
    setModel(m);
    setSearch(m);
    setShowSug(false);
    setSearchErr(false);
    setSubmitted(false);
    setSubmitErr("");
    setDraftSaved(false);
    setForm({ ...initialState, ...MODEL_DATA[m], routeCardNo: rcNo });
    refreshCount();
  };

  // ── Resume a draft ──────────────────────────────────────────────────────────
  const resumeDraft = (d) => {
    setModel(d.model);
    setSearch(d.model);
    setForm(d.form);
    setSubmitted(false);
    setSubmitErr("");
    setDraftSaved(false);
    setPage("form");
    refreshCount();
  };

  const shake = () => { setShaking(true); setSearchErr(true); setTimeout(()=>setShaking(false),500); };

  const handleSearchChange = (e) => {
    const v=e.target.value; setSearch(v); setSearchErr(false); setShowSug(v.length>0);
    const ex=allModels.find(m=>m.toLowerCase()===v.toLowerCase());
    if(ex) openModel(ex);
  };
  const handleSearchKey = (e) => {
    if(e.key==="Enter"){
      const ex=allModels.find(m=>m.toLowerCase()===search.toLowerCase());
      if(ex) openModel(ex); else if(filtered.length===1) openModel(filtered[0]); else shake();
    }
    if(e.key==="Escape") setShowSug(false);
  };
  const handleSelect = (e) => {
    if(e.target.value) openModel(e.target.value);
    else { setModel(""); setForm(initialState); setSearch(""); }
  };
  const handleChange = useCallback((e) => {
    const f=e.target.getAttribute("data-field");
    setForm(prev=>({...prev,[f]:e.target.value}));
  },[]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = ALL_FIELDS_FLAT.filter(f => String(form[f]??"").trim()==="");
    if (missing.length > 0) {
      // Save incomplete form as draft
      upsertDraft(form, model);
      refreshCount();
      setDraftSaved(true);
      setSubmitErr("");
      setTimeout(() => setDraftSaved(false), 10000);
      return;
    }
    // All filled — submit to Sheets
    setSubmitting(true); setSubmitted(false); setSubmitErr("");
    try {
      await submitToSheet(form, model);
      removeDraft(form.routeCardNo);   // clean up draft if it existed
      refreshCount();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setSubmitErr("Submit failed. Check your Apps Script URL and redeploy.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(prev => ({
      ...(model && MODEL_DATA[model] ? {...initialState,...MODEL_DATA[model]} : initialState),
      routeCardNo: prev.routeCardNo,   // keep allocated RC number
    }));
    setSubmitted(false); setSubmitErr(""); setDraftSaved(false);
  };

  // ── Render helpers ──────────────────────────────────────────────────────────
  const fi  = (field, ph="", type="text", ro=false) => (
    <input style={ro?S.inpRO:S.inp} type={type} data-field={field} value={form[field]}
      onChange={ro?undefined:handleChange} placeholder={ph} readOnly={ro}
      title={ro?"Auto-generated — cannot be edited":undefined}/>
  );
  const ti  = (field, ph="", type="text") => (
    <input style={S.tInp} type={type} data-field={field} value={form[field]} onChange={handleChange} placeholder={ph}/>
  );
  const lbl = (text, badge) => (
    <span style={S.fldLbl}>{text}
      {badge&&<span style={{marginLeft:6,color:"#22c55e",fontWeight:700,fontSize:9}}>{badge}</span>}
    </span>
  );
  const SecLbl = ({letter, title}) => (
    <div style={S.secLbl}><span>{letter} — {title}</span><StatusLight form={form} section={letter}/></div>
  );

  // ── Page routing ─────────────────────────────────────────────────────────────
  if (page==="view")   return <ViewAllCards onBack={()=>setPage("form")}/>;
  if (page==="drafts") return <DraftsPage onBack={()=>{setPage("form");refreshCount();}} onResume={resumeDraft}/>;

  return (
    <div style={S.wrap}>
      <style>{`
        @keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}30%{transform:translateX(8px)}45%{transform:translateX(-5px)}60%{transform:translateX(5px)}75%{transform:translateX(-3px)}90%{transform:translateX(3px)}}
        .shake{animation:shake 0.45s ease}
        .si{padding:9px 14px;font-size:13px;font-family:monospace;font-weight:600;border-bottom:1px solid #eee;color:#111;cursor:pointer}
        .si:hover{background:#f5f5f5}
      `}</style>

      {/* NAV BAR */}
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <button style={{...S.btnRst,marginRight:0,fontSize:12}} onClick={()=>setShowCounters(c=>!c)}>
          {showCounters?"▲ Hide Series":"📊 Series"}
        </button>
        <button style={S.btnDr} onClick={()=>setPage("drafts")}>
          📝 Drafts
          {draftCount>0&&<span style={{position:"absolute",top:-8,right:-8,background:"#ef4444",color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{draftCount}</span>}
        </button>
        <button style={S.btnVw} onClick={()=>setPage("view")}>📋 View All Cards</button>
      </div>

      {showCounters&&<RcCounterPanel models={allModels}/>}

      {/* MODEL SELECTOR */}
      <div style={{background:"#fff",border:"2px solid #111",boxShadow:"5px 5px 0 #111",padding:"24px 28px",marginBottom:28}}>
        <div style={{fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#555",marginBottom:16}}>Select Model to Open Route Card</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-start"}}>
          <div style={{position:"relative",flex:1,minWidth:220}}>
            <div className={shaking?"shake":""} style={{display:"flex",alignItems:"center",gap:8,border:`2px solid ${searchErr?"#e53e3e":"#bbb"}`,padding:"8px 12px",background:searchErr?"#fff5f5":"#fafafa"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30 30" fill={searchErr?"#e53e3e":"#888"}>
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
              </svg>
              <input type="text" placeholder="Type model & press Enter…" value={search}
                onChange={handleSearchChange} onKeyDown={handleSearchKey}
                onFocus={()=>search.length>0&&setShowSug(true)}
                onBlur={()=>setTimeout(()=>setShowSug(false),160)}
                style={{border:"none",outline:"none",background:"transparent",fontSize:14,color:searchErr?"#e53e3e":"#111",width:"100%",fontFamily:"inherit",fontWeight:500}}/>
              {search&&<span onMouseDown={()=>{setSearch("");setSearchErr(false);setShowSug(false);setModel("");setForm(initialState);}} style={{cursor:"pointer",color:"#aaa",fontSize:16,userSelect:"none"}}>✕</span>}
            </div>
            {searchErr&&<div style={{fontSize:11,color:"#e53e3e",marginTop:5,fontWeight:700}}>✕ Model not found — try HHRA or HSRA</div>}
            {showSug&&filtered.length>0&&(
              <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,zIndex:200,border:"2px solid #111",background:"#fff",boxShadow:"4px 4px 0 #111",maxHeight:200,overflowY:"auto"}}>
                {filtered.map(m=><div key={m} className="si" onMouseDown={()=>openModel(m)}>{m}</div>)}
              </div>
            )}
            {showSug&&filtered.length===0&&<div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,zIndex:200,border:"2px solid #e53e3e",background:"#fff5f5",padding:"10px 14px",fontSize:12,color:"#e53e3e",fontWeight:700}}>No matching model</div>}
          </div>
          <div style={{display:"flex",alignItems:"center",color:"#bbb",fontSize:12,fontWeight:700,paddingTop:10}}>OR</div>
          <select value={model} onChange={handleSelect} style={{padding:"10px 16px",border:"2px solid #111",fontSize:14,fontFamily:"inherit",fontWeight:600,background:"#fff",cursor:"pointer",minWidth:220,outline:"none",height:44}}>
            <option value="">-- Select from list --</option>
            {allModels.map(m=><option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {!model&&<div style={{marginTop:14,fontSize:12,color:"#999",fontStyle:"italic"}}>Type a model name or pick from the dropdown — the Route Card opens automatically.</div>}
        {model&&(
          <div style={{marginTop:14,display:"flex",flexWrap:"wrap",alignItems:"center",gap:10}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#111",color:"#fff",padding:"5px 14px",fontSize:12,fontWeight:700,letterSpacing:"0.08em"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}/>LOADED: {model}
            </div>
            {form.routeCardNo&&(
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#f0fdf4",border:"1.5px solid #22c55e",color:"#166534",padding:"5px 14px",fontSize:12,fontWeight:700}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>RC# {form.routeCardNo}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FORM */}
      {model&&(
        <>
          {submitted&&<div style={S.ok}>✓ Route Card <strong>{form.routeCardNo}</strong> saved to Google Sheets successfully!</div>}
          {submitErr&&<div style={S.err}>✕ {submitErr}</div>}
          {draftSaved&&(
            <div style={S.drft}>
              <span>📋 Incomplete — saved as Draft (RC# <strong>{form.routeCardNo}</strong>). Fill remaining fields and resubmit.</span>
              <button onClick={()=>setPage("drafts")} style={{background:"#854d0e",color:"#fff",border:"none",padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Go to Drafts →</button>
            </div>
          )}

          <form style={S.card} onSubmit={handleSubmit}>
            <div style={S.hdr}>
              <div style={S.hdrL}><h1 style={S.h1}>Route Card</h1><p style={S.sub}>Roller Rocker Arm — <strong>{model}</strong></p></div>
              <div style={S.hdrR}><div style={S.logo}>SANSERA</div><div style={S.logoS}>ideas@work</div></div>
            </div>

            {/* A */}
            <SecLbl letter="A" title="Store Use"/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
              <div style={cell()}>{lbl("Route Card No.","AUTO")}{fi("routeCardNo","","text",true)}</div>
              <div style={cell()}>{lbl("Start Date")}{fi("startDate","","date")}</div>
              <div style={cell()}>{lbl("End Date")}{fi("endDate","","date")}</div>
              <div style={cell(true)}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
              <div style={cell(false,true)}>{lbl("Component")}{fi("component")}</div>
              <div style={cell()}>{lbl("Issued Material Inv. No.")}{fi("issuedMaterialInvNo")}</div>
              <div style={cell(true)}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
              <div style={cell()}>{lbl("Issued Qty.")}{fi("issuedQty")}</div><div style={cell()}/>
              <div style={cell()}>{lbl("Issued Material Inv. Date")}{fi("issuedMaterialInvDate","","date")}</div>
              <div style={cell(true)}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
              <div style={cell()}>{lbl("Customer")}{fi("customer")}</div><div style={cell()}/>
              <div style={cell()}>{lbl("Issued Material Inv. Qty.")}{fi("issuedMaterialInvQty")}</div>
              <div style={cell(true)}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
              <div style={cell()}>{lbl("Heat No.")}{fi("heatNo")}</div>
              <div style={cell()}/><div style={cell()}/><div style={cell(true)}/>
            </div>

            {/* B */}
            <SecLbl letter="B" title="Machine Shop Use"/>
            <table style={S.tbl}><thead><tr>
              <th style={{...th(),width:"22%"}}>Operation</th>
              <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th><th style={th()}>Rej. Qty.</th><th style={th()}>Date</th><th style={th(true)}>Sign.</th>
            </tr></thead><tbody><tr>
              <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Soft Machining</td>
              <td style={td()}>{ti("softMachiningOkQty","0")}</td><td style={td()}>{ti("softMachiningRewQty","0")}</td>
              <td style={td()}>{ti("softMachiningRejQty","0")}</td><td style={td()}>{ti("softMachiningDate","","date")}</td>
              <td style={td(true)}>{ti("softMachiningSign","Signature")}</td>
            </tr></tbody></table>

            {/* C */}
            <SecLbl letter="C" title="HT Shop Use"/>
            <table style={S.tbl}><thead><tr>
              <th style={{...th(),width:"22%"}}>Operation</th>
              <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th><th style={th()}>Rej. Qty.</th><th style={th()}>Date</th><th style={th(true)}>Sign.</th>
            </tr></thead><tbody>
              <tr>
                <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Heat Treatment</td>
                <td style={td()}>{ti("htOkQty","0")}</td><td style={td()}>{ti("htRewQty","0")}</td>
                <td style={td()}>{ti("htRejQty","0")}</td><td style={td()}>{ti("htDate","","date")}</td>
                <td style={td(true)}>{ti("htSign","Signature")}</td>
              </tr>
              <tr>
                <td style={td()}>{lbl("HT Charge No.")}{ti("htChargeNo","—")}</td>
                <td style={td()} colSpan={2}/>
                <td style={td(true)} colSpan={3}>{lbl("HT Charge Date")}{ti("htChargeDate","","date")}</td>
              </tr>
            </tbody></table>

            {/* D */}
            <SecLbl letter="D" title="Machine Shop Use"/>
            <table style={S.tbl}><thead><tr>
              <th style={{...th(),width:"22%"}}>Operation</th>
              <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th><th style={th()}>Rej. Qty.</th><th style={th()}>Date</th><th style={th(true)}>Sign.</th>
            </tr></thead><tbody>
              <tr>
                <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Hard Machining</td>
                <td style={td()}>{ti("hardMachiningOkQty","0")}</td><td style={td()}>{ti("hardMachiningRewQty","0")}</td>
                <td style={td()}>{ti("hardMachiningRejQty","0")}</td><td style={td()}>{ti("hardMachiningDate","","date")}</td>
                <td style={td(true)}>{ti("hardMachiningSign","Signature")}</td>
              </tr>
              <tr>
                <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Cleaning</td>
                <td style={td()}>{ti("cleaningOkQty","0")}</td><td style={td()}>{ti("cleaningRewQty","0")}</td>
                <td style={td()}>{ti("cleaningRejQty","0")}</td><td style={td()}>{ti("cleaningDate","","date")}</td>
                <td style={td(true)}>{ti("cleaningSign","Signature")}</td>
              </tr>
            </tbody></table>

            {/* E */}
            <SecLbl letter="E" title="Assembly Use"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={aCell()}>{lbl("Screw Inv. No.")}{fi("screwInvNo","—")}</div>
              <div style={aCell()}>{lbl("Screw Inv. Date")}{fi("screwInvDate","","date")}</div>
              <div style={aCell(true)}>{lbl("Issued Qty.")}{fi("screwIssuedQty","0")}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={aCell()}>{lbl("Nut Inv. No.")}{fi("nutInvNo","—")}</div>
              <div style={aCell()}>{lbl("Nut Inv. Date")}{fi("nutInvDate","","date")}</div>
              <div style={aCell(true)}>{lbl("Issued Qty.")}{fi("nutIssuedQty","0")}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={aCell()}>{lbl("Bearing Inv. No.")}{fi("bearingInvNo","—")}</div>
              <div style={aCell()}>{lbl("Bearing Inv. Date")}{fi("bearingInvDate","","date")}</div>
              <div style={aCell(true)}>{lbl("Issued Qty.")}{fi("bearingIssuedQty","0")}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={aCell()}>{lbl("Bearing Shaft Inv. No.")}{fi("bearingShaftInvNo","—")}</div>
              <div style={aCell()}>{lbl("Shaft Inv. Date")}{fi("shaftInvDate","","date")}</div>
              <div style={aCell(true)}>{lbl("Issued Qty.")}{fi("shaftIssuedQty","0")}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
              <div style={aCell()}>{lbl("Shell Bearing Inv. No.")}{fi("shellBearingInvNo","—")}</div>
              <div style={aCell()}>{lbl("Shell Bearing Inv. Date")}{fi("shellBearingInvDate","","date")}</div>
              <div style={aCell(true)}/>
            </div>
            <table style={S.tbl}><thead><tr>
              <th style={{...th(),width:"22%"}}>Operation</th>
              <th style={th()}>OK Qty.</th><th style={th()}>Rew. Qty.</th><th style={th()}>Rej. Qty.</th><th style={th()}>Date</th><th style={th(true)}>Sign.</th>
            </tr></thead><tbody><tr>
              <td style={{...td(),fontSize:13,fontWeight:600,color:"#222"}}>Assembly</td>
              <td style={td()}>{ti("assemblyOkQty","0")}</td><td style={td()}>{ti("assemblyRewQty","0")}</td>
              <td style={td()}>{ti("assemblyRejQty","0")}</td><td style={td()}>{ti("assemblyDate","","date")}</td>
              <td style={td(true)}>{ti("assemblySign","Signature")}</td>
            </tr></tbody></table>

            {/* F */}
            <SecLbl letter="F" title="Dispatch Use"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <div style={cell()}>{lbl("Despatch Invoice No.")}{fi("despatchInvoiceNo","—")}</div>
              <div style={cell(true)}>{lbl("Despatch Inv. Date")}{fi("despatchInvDate","","date")}</div>
            </div>

            <div style={S.footer}>
              <span style={S.ref}>F760B/02</span>
              <div>
                <button type="button" style={S.btnRst} onClick={handleReset}>Reset</button>
                <button type="submit" style={{...S.btnSub,...(submitting?{opacity:0.7,cursor:"not-allowed"}:{})}} disabled={submitting}>
                  {submitting?"Saving…":"Submit & Save to Sheet"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Routecard;