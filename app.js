(() => {
  const { useEffect, useMemo, useState } = React;
  const { useRef } = React;
  const Icon = ({ name, size = 18, className = "" }) => {
    useEffect(() => {
      var _a;
      (_a = window.lucide) == null ? void 0 : _a.createIcons();
    });
    return /* @__PURE__ */ React.createElement("i", { "data-lucide": name, width: size, height: size, className });
  };
  const projects = [
    ["\u6211\u5728\u5E9F\u592A\u5B50\u7075\u524D\uFF0C\u6740\u7A7F\u6574\u4E2A\u671D\u5802", "12\u96C6"],
    ["\u5251\u52A8\u529B\u664B\uFF1A\u5E9F\u67F4\u5C11\u5E74\u7684\u9006\u5929\u4E4B\u8DEF", "24\u96C6"],
    ["\u5251\u5578\u4E5D\u5929\uFF1A\u5E9F\u67F4\u5C11\u5E74\u7684\u9006\u5929\u4E4B\u8DEF", "36\u96C6"],
    ["\u6C89\u9ED8\uFF0C\u5409\u591A\u5C3C\u4E9A\u8461\u8404", "12\u96C6"],
    ["md \u6C89\u9ED8\uFF0C\u5409\u591A\u5C3C\u4E9A\u8461\u8404", "1\u96C6"],
    ["\u6298\u6885", "1\u96C6"],
    ["\u76D8\u70B9\u5341\u5927\u949F\u8BDD\u4E8B\u4EF6", "12\u96C6"]
  ];
  const importStats = {
    title: "\u96EA\u591C\u65E7\u6848",
    topic: "\u60AC\u7591\u53CD\u8F6C / \u90FD\u5E02\u65E7\u6848",
    style: "\u51B7\u8272\u591C\u666F\u3001\u5BA4\u5185\u4F4E\u7167\u5EA6\u3001\u5199\u5B9E\u60AC\u7591",
    episodes: "12 \u96C6",
    summary: "\u4E00\u6869\u96EA\u591C\u65E7\u6848\u88AB\u91CD\u65B0\u7FFB\u51FA\uFF0C\u4E3B\u89D2\u4ECE\u9057\u7559\u7EBF\u7D22\u4E2D\u8FFD\u67E5\u771F\u76F8\uFF0C\u9010\u6B65\u53D1\u73B0\u5F53\u5E74\u7684\u8BC1\u8BCD\u3001\u73B0\u573A\u4E0E\u5173\u952E\u4EBA\u7269\u4E4B\u95F4\u5B58\u5728\u77DB\u76FE\u3002",
    estimate: "\u7EA6 120-180 \u79EF\u5206"
  };
  const sampleAttachments = {
    script: { kind: "script", name: "\u96EA\u591C\u65E7\u6848_\u5206\u955C\u811A\u672C.docx", type: "DOCX", size: "4.8 MB", icon: "file-text" },
    other: { kind: "other", name: "\u96EA\u591C\u65E7\u6848_\u5C0F\u8BF4\u8282\u9009.docx", type: "DOCX", size: "3.1 MB", icon: "book-open-text" },
    image: { kind: "image", name: "\u5C4B\u9876\u591C\u666F_\u53C2\u8003\u56FE.png", type: "PNG", size: "2.4 MB", icon: "image" },
    video: { kind: "video", name: "\u96E8\u591C\u5DF7\u53E3_\u53C2\u8003\u89C6\u9891.mp4", type: "MP4", size: "18.6 MB", icon: "video" },
    audio: { kind: "audio", name: "\u4F4E\u58F0\u65C1\u767D_\u60C5\u7EEA\u53C2\u8003.wav", type: "WAV", size: "6.2 MB", icon: "audio-lines" },
    document: { kind: "document", name: "\u65E7\u6848\u80CC\u666F\u8D44\u6599.pdf", type: "PDF", size: "2.8 MB", icon: "file-search" }
  };
  function classifyAttachment(fileName = "") {
    const lower = fileName.toLowerCase();
    if (/\.(png|jpg|jpeg|webp)$/.test(lower)) return "image";
    if (/\.(mp4|mov|webm)$/.test(lower)) return "video";
    if (/\.(mp3|wav|m4a|aac)$/.test(lower)) return "audio";
    if (/小说|故事|正文|节选/.test(fileName)) return "other";
    if (/剧本|分镜|导演|脚本|镜号|镜头/.test(fileName)) return "script";
    return "document";
  }
  function attachmentFromFile(file) {
    var _a, _b, _c;
    const kind = classifyAttachment(file == null ? void 0 : file.name);
    const ext = ((_b = (_a = file == null ? void 0 : file.name) == null ? void 0 : _a.split(".").pop()) == null ? void 0 : _b.toUpperCase()) || "FILE";
    const sizeMb = (file == null ? void 0 : file.size) ? `${Math.max(file.size / 1024 / 1024, 0.1).toFixed(1)} MB` : "\u5DF2\u9009\u62E9";
    const iconMap = { script: "file-text", other: "book-open-text", image: "image", video: "video", audio: "audio-lines", document: "file-search" };
    return { kind, name: (file == null ? void 0 : file.name) || ((_c = sampleAttachments[kind]) == null ? void 0 : _c.name) || "\u672A\u547D\u540D\u6587\u4EF6", type: ext, size: sizeMb, icon: iconMap[kind] || "paperclip" };
  }
  function AttachmentChip({ attachment, status = "\u4E0A\u4F20\u6210\u529F", onRemove }) {
    if (!attachment) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "inline-flex max-w-full items-center gap-3 rounded-2xl border border-[#d8e4f2] bg-white px-3 py-2 shadow-soft" }, /* @__PURE__ */ React.createElement("span", { className: "h-9 w-9 shrink-0 rounded-xl bg-[#eef3ff] text-blue grid place-items-center" }, /* @__PURE__ */ React.createElement(Icon, { name: attachment.icon || "paperclip", size: 18 })), /* @__PURE__ */ React.createElement("span", { className: "min-w-0 text-left" }, /* @__PURE__ */ React.createElement("span", { className: "block max-w-[420px] truncate text-sm font-extrabold text-ink" }, attachment.name), /* @__PURE__ */ React.createElement("span", { className: "mt-0.5 flex items-center gap-2 text-xs text-muted" }, /* @__PURE__ */ React.createElement("span", null, attachment.type), /* @__PURE__ */ React.createElement("span", null, "\xB7"), /* @__PURE__ */ React.createElement("span", null, attachment.size), /* @__PURE__ */ React.createElement("span", null, "\xB7"), /* @__PURE__ */ React.createElement("span", { className: "text-good font-bold" }, status))), onRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, className: "h-7 w-7 shrink-0 rounded-full text-slate-400 hover:bg-slate-100 hover:text-ink grid place-items-center" }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 15 })));
  }
  function FileUserMessage({ attachment, text }) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex justify-end mb-7" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[560px] rounded-2xl bg-[#eef2ff] px-4 py-3 text-[15px] leading-7 text-ink" }, text && /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, text), /* @__PURE__ */ React.createElement(AttachmentChip, { attachment, status: "\u5DF2\u53D1\u9001" })));
  }
  function Sidebar() {
    return /* @__PURE__ */ React.createElement("aside", { className: "h-full w-[320px] shrink-0 border-r border-line bg-white/95 flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "h-20 px-7 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "brand-mark h-8 w-8 rounded-xl grid place-items-center text-white font-black" }, "S"), /* @__PURE__ */ React.createElement("div", { className: "font-extrabold text-xl" }, "\u5851\u68A6AI"), /* @__PURE__ */ React.createElement("button", { className: "ml-auto h-8 w-8 grid place-items-center rounded-lg text-slate-500 hover:bg-slate-100" }, /* @__PURE__ */ React.createElement(Icon, { name: "panel-left" }))), /* @__PURE__ */ React.createElement("button", { className: "mx-4 h-11 rounded-full bg-navy text-white font-bold flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), " \u65B0\u5EFA\u4F1A\u8BDD"), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto scrollbar-thin px-4 py-6" }, /* @__PURE__ */ React.createElement(NavTitle, { icon: "shapes", label: "\u8D44\u4EA7\u5E93" }), /* @__PURE__ */ React.createElement(NavTitle, { icon: "folder", label: "\u6211\u7684\u9879\u76EE", chevron: true }), /* @__PURE__ */ React.createElement("div", { className: "space-y-1 mb-7" }, projects.map(([name, count], index) => /* @__PURE__ */ React.createElement("div", { key: name, className: `h-10 rounded-lg px-2 grid grid-cols-[18px_1fr_auto] items-center gap-2 text-sm ${index === 2 ? "bg-[#edf1ff] text-[#513fff]" : "text-slate-700 hover:bg-slate-50"}` }, /* @__PURE__ */ React.createElement("span", { className: "h-3 w-4 rounded-[3px] bg-gradient-to-br from-[#a68aff] to-[#6f8dff]" }), /* @__PURE__ */ React.createElement("span", { className: "truncate" }, name), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400" }, count)))), /* @__PURE__ */ React.createElement(NavTitle, { icon: "message-square", label: "\u6700\u8FD1\u4F1A\u8BDD", chevron: true }), ["Create a 1-episode costume suspense shor", "\u4F60\u597D", "\u8BF7\u521B\u4F5C\u4E00\u90E8\u4FEE\u4ED9\u9006\u88AD\u77ED\u5267\uFF1A\u7075\u6839\u88AB\u5E9F\u7684\u5916\u95E8\u5C11\u5E74\u610F...", "\u65E7\u5C4B\u3001\u5F55\u97F3\u7B14\u3001\u5899\u540E\u6709\u4EBA\uFF0C\u60AC\u7591\u53CD\u8F6C\u3002"].map((item, index) => /* @__PURE__ */ React.createElement("div", { key: item, className: `min-h-9 rounded-lg px-3 py-2 text-sm ${index === 0 ? "bg-[#edf1ff] text-[#513fff]" : "text-slate-600"}` }, item))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-line bg-white px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "h-9 border border-line rounded-lg px-3 flex items-center justify-between text-sm text-slate-600 mb-3" }, "\u4E2A\u4EBA\u7A7A\u95F4 ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 15 })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold" }, "\u5927"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold" }, "\u5927\u9B54\u672F\u5E08\uFF08\u6B63\u5F0F\u7248\uFF09"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-brand font-bold" }, "\u95EA\u7535 6,218")))));
  }
  function NavTitle({ icon, label, chevron }) {
    return /* @__PURE__ */ React.createElement("div", { className: "h-9 flex items-center gap-2 text-sm font-bold text-ink" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 18 }), " ", label, chevron && /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 15, className: "ml-auto text-slate-500" }));
  }
  function Topbar({ mode }) {
    return /* @__PURE__ */ React.createElement("header", { className: "h-14 border-b border-line bg-white/90 backdrop-blur px-8 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 font-bold" }, /* @__PURE__ */ React.createElement(Icon, { name: mode === "table" ? "table-2" : "message-square", size: 20 }), mode === "table" ? "\u96EA\u591C\u65E7\u6848 \xB7 \u5206\u955C\u8868" : "\u96EA\u591C\u65E7\u6848 \xB7 \u5BFC\u5165\u4E2D"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-5 text-slate-500" }, /* @__PURE__ */ React.createElement(Icon, { name: "panel-right" }), /* @__PURE__ */ React.createElement(Icon, { name: "sun" })));
  }
  function InitialCard({ onStart, onReupload }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:12" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u521D\u6B65\u7406\u89E3", icon: "scan-text" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(Info, { label: "\u6807\u9898", value: importStats.title }), /* @__PURE__ */ React.createElement(Info, { label: "\u9898\u6750", value: importStats.topic }), /* @__PURE__ */ React.createElement(Info, { label: "\u89C6\u89C9\u98CE\u683C", value: importStats.style }), /* @__PURE__ */ React.createElement(Info, { label: "\u96C6\u6570", value: importStats.episodes, note: "\u4F4E\u6210\u672C\u89C4\u5219\u547D\u4E2D\u624D\u5C55\u793A" }), /* @__PURE__ */ React.createElement(Info, { className: "col-span-2", label: "\u6545\u4E8B\u6982\u89C8", value: importStats.summary })), /* @__PURE__ */ React.createElement("div", { className: "mx-5 mb-4 rounded-xl border border-line bg-[#f8fbff] p-4 flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted mb-1" }, "\u9884\u4F30\u6D88\u8017"), /* @__PURE__ */ React.createElement("div", { className: "font-extrabold" }, importStats.estimate), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-muted mt-1 leading-5" }, "\u6309\u6587\u672C\u957F\u5EA6\u548C\u89E3\u6790\u590D\u6742\u5EA6\u4F30\u7B97\uFF0C\u5B9E\u9645\u4EE5\u5BFC\u5165\u5B8C\u6210\u540E\u7684\u7528\u91CF\u4E3A\u51C6\u3002\u5BFC\u5165\u4E2D\u53EF\u6682\u505C\u3002")), /* @__PURE__ */ React.createElement("span", { className: "h-8 px-3 rounded-full bg-blue-50 text-blue font-extrabold text-xs flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "zap", size: 14 }), " \u5F00\u59CB\u524D\u786E\u8BA4")), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onStart, icon: "play" }, "\u5F00\u59CB\u5BFC\u5165"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onReupload, icon: "file-plus-2" }, "\u91CD\u65B0\u9009\u62E9\u6587\u4EF6"))));
  }
  function QuickReplies({ items, onPick }) {
    return /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex flex-wrap gap-3" }, items.map((item) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item,
        onClick: () => onPick(item),
        className: "h-8 px-3 rounded-full border border-[#d8e4f2] bg-white text-sm text-slate-600 hover:border-brand hover:text-brand"
      },
      item
    )));
  }
  function OtherTextIntentMessage({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:12" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, "\u6211\u770B\u4E86\u4E00\u4E0B\uFF0C\u8FD9\u4EFD\u5185\u5BB9\u66F4\u50CF\u5C0F\u8BF4 / \u6545\u4E8B\u6587\u672C\u3002\u4F60\u5E0C\u671B\u6211\u63A5\u4E0B\u6765\u600E\u4E48\u5904\u7406\uFF1F"), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u6539\u6210\u5206\u955C\u811A\u672C", "\u5148\u8BA8\u8BBA\u6545\u4E8B\u65B9\u5411"], onPick: onQuickReply })));
  }
  function MediaIntentMessage({ kind, onQuickReply }) {
    const copy = {
      image: "\u5DF2\u8BFB\u53D6\u8FD9\u5F20\u53C2\u8003\u56FE\u3002\u6211\u53EF\u4EE5\u5E2E\u4F60\u5206\u6790\u89D2\u8272\u3001\u573A\u666F\u3001\u98CE\u683C\uFF0C\u6216\u4F5C\u4E3A\u540E\u7EED\u751F\u6210\u53C2\u8003\u3002\u4F60\u60F3\u5148\u770B\u54EA\u4E00\u90E8\u5206\uFF1F",
      video: "\u5DF2\u6536\u5230\u8FD9\u6BB5\u89C6\u9891\u3002\u6211\u53EF\u4EE5\u5148\u67E5\u770B\u57FA\u7840\u4FE1\u606F\u548C\u753B\u9762\u7528\u9014\uFF0C\u4F8B\u5982\u573A\u666F\u6C1B\u56F4\u3001\u8282\u594F\u53C2\u8003\u6216\u955C\u5934\u53C2\u8003\u65B9\u5411\u3002",
      audio: "\u5DF2\u6536\u5230\u8FD9\u6BB5\u97F3\u9891\u3002\u6211\u53EF\u4EE5\u5148\u5224\u65AD\u5B83\u66F4\u9002\u5408\u4F5C\u4E3A\u914D\u97F3\u53C2\u8003\u3001\u97F3\u4E50\u6C1B\u56F4\uFF0C\u8FD8\u662F\u9879\u76EE\u8D44\u6599\u3002",
      document: "\u5DF2\u6536\u5230\u8FD9\u4EFD\u8D44\u6599\u3002\u6211\u53EF\u4EE5\u5148\u5E2E\u4F60\u603B\u7ED3\u5185\u5BB9\uFF0C\u6216\u63D0\u53D6\u5176\u4E2D\u53EF\u7528\u4E8E\u89D2\u8272\u3001\u573A\u666F\u3001\u5267\u60C5\u8BBE\u5B9A\u7684\u4FE1\u606F\u3002"
    };
    const replies = {
      image: ["\u63D0\u53D6\u89D2\u8272\u5F62\u8C61", "\u5206\u6790\u573A\u666F\u98CE\u683C", "\u751F\u6210\u89D2\u8272\u5F62\u8C61\u56FE", "\u8BBE\u7F6E\u4E3A\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61"],
      video: ["\u67E5\u770B\u57FA\u7840\u4FE1\u606F", "\u63D0\u53D6\u573A\u666F\u53C2\u8003", "\u8BBE\u7F6E\u4E3A\u955C\u59341\u53C2\u8003"],
      audio: ["\u5224\u65AD\u97F3\u9891\u7528\u9014", "\u63D0\u53D6\u914D\u97F3\u53C2\u8003", "\u8BBE\u7F6E\u4E3A\u9879\u76EE\u97F3\u9891\u8D44\u6599"],
      document: ["\u603B\u7ED3\u8D44\u6599", "\u63D0\u53D6\u89D2\u8272\u573A\u666F\u7EBF\u7D22"]
    };
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:12" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, copy[kind] || copy.document), /* @__PURE__ */ React.createElement(QuickReplies, { items: replies[kind] || replies.document, onPick: onQuickReply })));
  }
  function ImageUnderstandingResult({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:36" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "font-extrabold text-ink" }, "\u53C2\u8003\u56FE\u7406\u89E3\u7ED3\u679C"), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, "\u89D2\u8272\u6C14\u8D28\uFF1A\u5E74\u8F7B\u7537\u6027\uFF0C\u538B\u6291\u3001\u8B66\u89C9\u3001\u5E26\u65E7\u6848\u521B\u4F24\u611F\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u670D\u88C5\u7EBF\u7D22\uFF1A\u6DF1\u8272\u5916\u5957\u3001\u5FAE\u6E7F\u53D1\u4E1D\u3001\u57CE\u5E02\u591C\u666F\u53CD\u5149\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u753B\u9762\u98CE\u683C\uFF1A\u51B7\u8272\u9713\u8679\u3001\u4F4E\u7167\u5EA6\u3001\u5199\u5B9E\u60AC\u7591\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u53EF\u7528\u65B9\u5411\uFF1A\u89D2\u8272\u5F62\u8C61\u56FE\u3001\u6D77\u62A5\u4E3B\u89C6\u89C9\u3001\u955C\u5934\u6C1B\u56F4\u53C2\u8003\u3002"), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, "\u6211\u53EF\u4EE5\u7EE7\u7EED\u57FA\u4E8E\u8FD9\u5F20\u56FE\u751F\u6210\u4E34\u65F6\u89D2\u8272\u5F62\u8C61\u56FE\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u628A\u5B83\u8BBE\u7F6E\u5230\u9879\u76EE\u89D2\u8272\u4E0A\u3002")), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u751F\u6210\u89D2\u8272\u5F62\u8C61\u56FE", "\u8BBE\u7F6E\u4E3A\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61", "\u63D0\u53D6\u6210\u63D0\u793A\u8BCD"], onPick: onQuickReply })));
  }
  function SceneUnderstandingResult({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:36" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "font-extrabold text-ink" }, "\u573A\u666F\u98CE\u683C\u5206\u6790"), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, "\u7A7A\u95F4\uFF1A\u9AD8\u697C\u5C4B\u9876\u6216\u73BB\u7483\u5E55\u5899\u9644\u8FD1\uFF0C\u9002\u5408\u505A\u57CE\u5E02\u65E7\u6848\u7684\u8C03\u67E5\u8282\u70B9\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u5149\u7EBF\uFF1A\u4F4E\u7167\u5EA6\u3001\u51B7\u84DD\u4E3B\u8C03\uFF0C\u4EBA\u7269\u8FB9\u7F18\u6709\u9713\u8679\u53CD\u5149\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u955C\u5934\u5EFA\u8BAE\uFF1A\u4E2D\u8FD1\u666F\u538B\u8FEB\u611F\u5F00\u573A\uFF0C\u968F\u540E\u63A8\u5230\u4EBA\u7269\u773C\u795E\u548C\u624B\u90E8\u7EBF\u7D22\u3002")), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u751F\u6210\u540C\u98CE\u683C\u573A\u666F\u56FE", "\u8BBE\u7F6E\u4E3A\u65E7\u6848\u5929\u53F0\u573A\u666F\u53C2\u8003"], onPick: onQuickReply })));
  }
  function VideoUnderstandingResult({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:36" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "font-extrabold text-ink" }, "\u89C6\u9891\u57FA\u7840\u7406\u89E3"), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, "\u65F6\u957F\uFF1A\u7EA6 12 \u79D2\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u753B\u9762\u7528\u9014\uFF1A\u96E8\u591C\u5DF7\u53E3\u3001\u8FFD\u8E2A\u3001\u8EB2\u907F\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u8282\u594F\uFF1A\u524D\u534A\u6BB5\u6162\u63A8\uFF0C\u540E\u534A\u6BB5\u6025\u4FC3\u79FB\u52A8\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u53EF\u5199\u56DE\u76EE\u6807\uFF1A\u955C\u5934\u53C2\u8003\u3001\u573A\u666F\u53C2\u8003\u3002")), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u8BBE\u7F6E\u4E3A\u955C\u59341\u53C2\u8003", "\u751F\u6210\u540C\u8282\u594F\u955C\u5934\u63D0\u793A\u8BCD"], onPick: onQuickReply })));
  }
  function AudioUnderstandingResult({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:36" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "font-extrabold text-ink" }, "\u97F3\u9891\u57FA\u7840\u7406\u89E3"), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, "\u7528\u9014\u5224\u65AD\uFF1A\u66F4\u9002\u5408\u4F5C\u4E3A\u4F4E\u58F0\u65C1\u767D\u548C\u60AC\u7591\u6C1B\u56F4\u53C2\u8003\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u60C5\u7EEA\u5173\u952E\u8BCD\uFF1A\u538B\u4F4E\u3001\u514B\u5236\u3001\u7D27\u5F20\u3001\u50CF\u5728\u907F\u5F00\u4ED6\u4EBA\u76D1\u542C\u3002"), /* @__PURE__ */ React.createElement("div", null, "P0 \u4E0D\u5C55\u793A\u9010\u5B57\u7A3F\u548C\u8BF4\u8BDD\u4EBA\u62C6\u5206\uFF0C\u53EA\u505A\u57FA\u7840\u7528\u9014\u5224\u65AD\u3002")), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u8BBE\u7F6E\u4E3A\u9879\u76EE\u97F3\u9891\u8D44\u6599", "\u751F\u6210\u65C1\u767D\u98CE\u683C\u63D0\u793A\u8BCD"], onPick: onQuickReply })));
  }
  function DocumentUnderstandingResult({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:36" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "font-extrabold text-ink" }, "\u8D44\u6599\u6587\u6863\u7406\u89E3"), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, "\u5173\u952E\u4FE1\u606F\uFF1A\u65E7\u6848\u65F6\u95F4\u7EBF\u3001\u5ACC\u7591\u4EBA\u8BC1\u8BCD\u3001\u73B0\u573A\u73AF\u5883\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u53EF\u63D0\u53D6\u5BF9\u8C61\uFF1A\u4EBA\u7269\u7EBF\u7D22\u3001\u573A\u666F\u7EBF\u7D22\u3001\u9053\u5177\u7EBF\u7D22\u3002"), /* @__PURE__ */ React.createElement("div", null, "\u5EFA\u8BAE\uFF1A\u5148\u4F5C\u4E3A\u9879\u76EE\u8D44\u6599\u7406\u89E3\uFF0C\u4E0D\u76F4\u63A5\u5BFC\u5165\u4E3A\u5206\u955C\u811A\u672C\u3002")), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u63D0\u53D6\u89D2\u8272\u573A\u666F\u7EBF\u7D22", "\u8BBE\u7F6E\u4E3A\u9879\u76EE\u8D44\u6599"], onPick: onQuickReply })));
  }
  function MultimodalGenerationCard({ onDone, onPause }) {
    const [tick, setTick] = useState(0);
    const lines = [
      "\u6B63\u5728\u5BF9\u9F50\u53C2\u8003\u56FE\u91CC\u7684\u51B7\u8272\u4F4E\u7167\u5EA6\u548C\u4EBA\u7269\u6C14\u8D28...",
      "\u6B63\u5728\u751F\u6210\u89D2\u8272\u5F62\u8C61\u56FE\uFF0C\u4FDD\u6301\u60AC\u7591\u77ED\u5267\u8D28\u611F...",
      "\u6B63\u5728\u68C0\u67E5\u9762\u90E8\u4E00\u81F4\u6027\u3001\u670D\u88C5\u7EC6\u8282\u548C\u80CC\u666F\u566A\u70B9..."
    ];
    useEffect(() => {
      const timer = setInterval(() => setTick((v) => (v + 1) % lines.length), 2200);
      return () => clearInterval(timer);
    }, []);
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:02" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u6B63\u5728\u751F\u6210\u89D2\u8272\u5F62\u8C61\u56FE", icon: "sparkles", badge: "\u4E34\u65F6\u751F\u6210" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-[#f8fbff] p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted" }, "\u5F53\u524D\u8FDB\u7A0B"), /* @__PURE__ */ React.createElement("div", { className: "mt-1 flex items-center gap-2 font-extrabold" }, /* @__PURE__ */ React.createElement("span", { className: "h-2 w-2 rounded-full bg-blue shadow-[0_0_0_4px_rgba(63,124,255,.12)]" }), "\u751F\u6210\u4E34\u65F6\u7ED3\u679C")), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-blue" }, "\u5904\u7406\u4E2D")), /* @__PURE__ */ React.createElement("div", { className: "mt-3 h-2 rounded-full bg-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-full w-[62%] rounded-full bg-gradient-to-r from-good to-blue" }))), /* @__PURE__ */ React.createElement("div", { className: "h-12 rounded-xl border border-line bg-white px-4 flex items-center gap-3 overflow-hidden" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-muted shrink-0" }, "\u6D41\u5F0F\u8F93\u51FA"), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 whitespace-nowrap overflow-hidden text-sm text-slate-600 fade-left direction-rtl" }, /* @__PURE__ */ React.createElement("span", { className: "inline-block direction-ltr" }, lines[tick])))), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onDone, icon: "check-circle-2" }, "\u6A21\u62DF\u751F\u6210\u5B8C\u6210"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onPause, icon: "pause" }, "\u6682\u505C\u751F\u6210"))));
  }
  function GeneratedAssetCard({ onBind, onRegenerate }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:48" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u4E34\u65F6\u89D2\u8272\u5F62\u8C61\u56FE", icon: "image", badge: "\u672A\u5199\u5165\u9879\u76EE" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 grid grid-cols-[220px_1fr] gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "h-[300px] rounded-xl overflow-hidden relative bg-[radial-gradient(circle_at_45%_18%,rgba(255,255,255,.85),transparent_12%),linear-gradient(160deg,#111827_0%,#22385f_48%,#7d5cff_100%)]" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-6 right-6 bottom-5 text-white" }, /* @__PURE__ */ React.createElement("div", { className: "text-lg font-extrabold" }, "\u6797\u71C3"), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-xs text-white/75" }, "\u51B7\u8272\u591C\u666F \xB7 \u5199\u5B9E\u60AC\u7591 \xB7 \u90FD\u5E02\u65E7\u6848")), /* @__PURE__ */ React.createElement("div", { className: "absolute left-1/2 top-16 h-24 w-24 -translate-x-1/2 rounded-full bg-slate-200/90 shadow-[0_0_60px_rgba(148,163,184,.65)]" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-1/2 top-36 h-28 w-32 -translate-x-1/2 rounded-t-[44px] bg-slate-900/80" })), /* @__PURE__ */ React.createElement("div", { className: "text-sm leading-7 text-slate-700" }, /* @__PURE__ */ React.createElement("b", null, "\u751F\u6210\u7ED3\u679C\u8BF4\u660E"), /* @__PURE__ */ React.createElement("p", { className: "mt-2" }, "\u8FD9\u662F\u5F53\u524D\u5BF9\u8BDD\u91CC\u7684\u4E34\u65F6\u751F\u6210\u7ED3\u679C\uFF0C\u8FD8\u6CA1\u6709\u4FDD\u5B58\u4E3A\u8D44\u4EA7\uFF0C\u4E5F\u6CA1\u6709\u5199\u5165\u89D2\u8272\u3002\u4F60\u53EF\u4EE5\u7EE7\u7EED\u8C03\u6574\uFF0C\u6216\u76F4\u63A5\u8BBE\u7F6E\u4E3A\u9879\u76EE\u89D2\u8272\u5F62\u8C61\u3002"), /* @__PURE__ */ React.createElement("div", { className: "mt-4 grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(Info, { label: "\u5339\u914D\u76EE\u6807", value: "\u6797\u71C3 / \u7537\u4E3B" }), /* @__PURE__ */ React.createElement(Info, { label: "\u7528\u9014", value: "\u89D2\u8272\u5F62\u8C61\u56FE" }), /* @__PURE__ */ React.createElement(Info, { label: "\u98CE\u683C", value: "\u51B7\u8272\u591C\u666F\u3001\u4F4E\u7167\u5EA6\u3001\u5199\u5B9E\u60AC\u7591" }), /* @__PURE__ */ React.createElement(Info, { label: "\u72B6\u6001", value: "\u4E34\u65F6\u7ED3\u679C\uFF0C\u5F85\u786E\u8BA4\u5199\u56DE" })))), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onBind, icon: "user-check" }, "\u8BBE\u7F6E\u4E3A\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onRegenerate, icon: "refresh-cw" }, "\u91CD\u65B0\u751F\u6210"), /* @__PURE__ */ React.createElement(Secondary, { icon: "download" }, "\u4E0B\u8F7D"))));
  }
  function BindingQuestionMessage({ target = "\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61", source = "\u4E34\u65F6\u89D2\u8272\u5F62\u8C61\u56FE", onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:25:02" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, target === "\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61" ? "\u300C\u6797\u71C3\u300D\u5DF2\u6709\u89D2\u8272\u5F62\u8C61\u56FE\u3002\u4F60\u60F3\u8986\u76D6\u5F53\u524D\u5F62\u8C61\uFF0C\u8FD8\u662F\u8FFD\u52A0\u4E3A\u5907\u7528\u53C2\u8003\uFF1F" : `\u6211\u4E0D\u592A\u786E\u5B9A\u8981\u628A ${source} \u8BBE\u7F6E\u5230\u54EA\u91CC\u3002\u4F60\u60F3\u8BBE\u7F6E\u4E3A ${target}\uFF0C\u8FD8\u662F\u6362\u4E00\u4E2A\u76EE\u6807\uFF1F`), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["\u8986\u76D6", "\u8FFD\u52A0\u4E3A\u5907\u7528\u53C2\u8003", "\u6362\u4E00\u4E2A\u76EE\u6807", "\u53D6\u6D88"], onPick: onQuickReply })));
  }
  function BindingSuccessMessage({ target = "\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61" }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:25:18" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-900" }, "\u5DF2\u8BBE\u7F6E\u4E3A\u300C", target, "\u300D\u3002\u540E\u7EED\u5728\u9879\u76EE\u521B\u4F5C\u4E2D\u53EF\u4EE5\u76F4\u63A5\u5F15\u7528\u8FD9\u4E2A\u5185\u5BB9\u3002"));
  }
  function UserMessage({ children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex justify-end mb-7" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[520px] rounded-2xl bg-[#eef2ff] px-5 py-3 text-[15px] leading-7 text-ink" }, children));
  }
  function AdaptConfirmCard({ onStart }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:10" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u6539\u7F16\u786E\u8BA4", icon: "wand-sparkles" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(Info, { label: "\u9879\u76EE\u6807\u9898", value: "\u96EA\u591C\u65E7\u6848" }), /* @__PURE__ */ React.createElement(Info, { label: "\u9898\u6750", value: "\u60AC\u7591\u53CD\u8F6C / \u90FD\u5E02\u65E7\u6848" }), /* @__PURE__ */ React.createElement(Info, { label: "\u96C6\u6570", value: "12 \u96C6", note: "\u53EF\u7EE7\u7EED\u8C03\u6574" }), /* @__PURE__ */ React.createElement(Info, { label: "\u5B57\u6570\u6863", value: "\u4E2D\u7BC7\uFF081500-2500\u5B57/\u96C6\uFF09" }), /* @__PURE__ */ React.createElement(Info, { label: "\u76EE\u6807\u5E73\u53F0", value: "\u77ED\u89C6\u9891" }), /* @__PURE__ */ React.createElement(Info, { label: "\u89C6\u89C9\u98CE\u683C", value: "\u5199\u5B9E\u60AC\u7591 / \u51B7\u8272\u591C\u666F / \u5BA4\u5185\u4F4E\u7167\u5EA6" }), /* @__PURE__ */ React.createElement(Info, { className: "col-span-2", label: "\u6545\u4E8B\u6982\u89C8", value: "\u56F4\u7ED5\u96EA\u591C\u65E7\u6848\u5C55\u5F00\u77ED\u5267\u5316\u6539\u7F16\uFF0C\u4FDD\u7559\u60AC\u7591\u53CD\u8F6C\u57FA\u8C03\uFF0C\u5C06\u5C0F\u8BF4\u53D9\u8FF0\u538B\u7F29\u6210\u53EF\u62CD\u6444\u7684\u96C6\u3001\u7247\u6BB5\u548C\u955C\u5934\u3002" })), /* @__PURE__ */ React.createElement("div", { className: "mx-5 mb-4 rounded-xl border border-line bg-[#f8fbff] p-4 flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted mb-1" }, "\u9884\u4F30\u6D88\u8017"), /* @__PURE__ */ React.createElement("div", { className: "font-extrabold" }, "\u7EA6 260-380 \u79EF\u5206"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-muted mt-1 leading-5" }, "\u6539\u7F16\u4F1A\u57FA\u4E8E\u539F\u6587\u8FDB\u884C\u521B\u4F5C\u8F6C\u6362\uFF0C\u4E0D\u662F\u539F\u6837\u5BFC\u5165\u3002\u5F00\u59CB\u540E\u53EF\u6682\u505C\u3002")), /* @__PURE__ */ React.createElement("span", { className: "h-8 px-3 rounded-full bg-blue-50 text-blue font-extrabold text-xs flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "zap", size: 14 }), " \u5F00\u59CB\u524D\u786E\u8BA4")), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onStart, icon: "play" }, "\u5F00\u59CB\u6539\u7F16"), /* @__PURE__ */ React.createElement(Secondary, { icon: "sliders-horizontal" }, "\u8C03\u6574\u76EE\u6807"))));
  }
  function AdaptDetailsQuestion({ onQuickReply }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, "\u53EF\u4EE5\uFF0C\u6211\u4F1A\u6309\u6539\u7F16\u5904\u7406\uFF0C\u4E0D\u4F1A\u4F5C\u4E3A\u539F\u6837\u5BFC\u5165\u3002\u4F60\u60F3\u6539\u6210\u591A\u5C11\u96C6\u3001\u9762\u5411\u4EC0\u4E48\u5E73\u53F0\u3001\u9009\u62E9\u54EA\u4E2A\u5B57\u6570\u6863\uFF1F\u5982\u679C\u4E0D\u786E\u5B9A\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8BF4\u201C\u4F60\u6765\u5EFA\u8BAE\u201D\u3002"), /* @__PURE__ */ React.createElement(QuickReplies, { items: ["12\u96C6 / \u77ED\u89C6\u9891 / \u4E2D\u7BC7", "\u4F60\u6765\u5EFA\u8BAE"], onPick: onQuickReply })));
  }
  function AdaptJobCard({ onPause, onDone }) {
    const [tick, setTick] = useState(0);
    const lines = [
      "\u6B63\u5728\u628A\u539F\u6587\u60C5\u8282\u538B\u7F29\u6210\u77ED\u5267\u8282\u594F...",
      "\u6B63\u5728\u8865\u9F50\u53EF\u62CD\u6444\u7684\u955C\u5934\u52A8\u4F5C\u548C\u5BF9\u767D...",
      "\u6B63\u5728\u62C6\u5206\u6BCF\u96C6\u7ED3\u5C3E\u94A9\u5B50\u5E76\u5199\u5165\u5206\u955C\u8349\u7A3F..."
    ];
    useEffect(() => {
      const timer = setInterval(() => setTick((v) => (v + 1) % lines.length), 2500);
      return () => clearInterval(timer);
    }, []);
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:36" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u6B63\u5728\u6539\u7F16\u4E3A\u5206\u955C\u811A\u672C", icon: "activity", badge: "Agent \u5DE5\u4F5C\u4E2D" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-[#f8fbff] p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted" }, "\u5F53\u524D\u8FDB\u7A0B"), /* @__PURE__ */ React.createElement("div", { className: "mt-1 flex items-center gap-2 font-extrabold" }, /* @__PURE__ */ React.createElement("span", { className: "h-2 w-2 rounded-full bg-blue shadow-[0_0_0_4px_rgba(63,124,255,.12)]" }), "\u751F\u6210\u5206\u955C\u8349\u7A3F")), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-blue" }, "\u5904\u7406\u4E2D")), /* @__PURE__ */ React.createElement("div", { className: "mt-3 h-2 rounded-full bg-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-full w-[48%] rounded-full bg-gradient-to-r from-good to-blue" }))), /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-[#f8fbff] p-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted" }, "\u5B8C\u6210\u60C5\u51B5"), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-sm leading-6 text-slate-700" }, "\u5DF2\u5B8C\u6210\u6545\u4E8B\u62C6\u89E3\uFF0C\u6B63\u5728\u751F\u6210\u7B2C 1 \u96C6\u5206\u955C\uFF1B\u5F53\u524D\u5DF2\u751F\u6210 ", /* @__PURE__ */ React.createElement("b", null, "3 / 12"), " \u96C6\u8349\u7A3F\uFF0C\u5F62\u6210 ", /* @__PURE__ */ React.createElement("b", null, "48"), " \u6761\u5206\u955C\u3002")), /* @__PURE__ */ React.createElement("div", { className: "h-12 rounded-xl border border-line bg-white px-4 flex items-center gap-3 overflow-hidden" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-muted shrink-0" }, "\u6D41\u5F0F\u8F93\u51FA"), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 whitespace-nowrap overflow-hidden text-sm text-slate-600 fade-left direction-rtl" }, /* @__PURE__ */ React.createElement("span", { className: "inline-block direction-ltr" }, lines[tick])))), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onPause, icon: "pause" }, "\u6682\u505C\u6539\u7F16"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onDone, icon: "check-circle-2" }, "\u6A21\u62DF\u5B8C\u6210"))));
  }
  function AdaptCompleteCard({ onOpenTable }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:28:02" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u6539\u7F16\u5B8C\u6210", icon: "check-check", badge: "\u5DF2\u751F\u6210\u5206\u955C" }), /* @__PURE__ */ React.createElement("div", { className: "px-5 py-4 text-sm leading-7 text-slate-700" }, "\u6539\u7F16\u5B8C\u6210\uFF1A\u5DF2\u751F\u6210 12 \u96C6\u300136 \u4E2A\u7247\u6BB5\u3001138 \u6761\u5206\u955C\uFF0C\u5E76\u63D0\u53D6 8 \u4E2A\u4EBA\u7269\u300115 \u4E2A\u573A\u666F\u300124 \u4E2A\u9053\u5177\u3002\u4F60\u53EF\u4EE5\u8FDB\u5165\u5206\u955C\u5DE5\u4F5C\u53F0\u7EE7\u7EED\u7F16\u8F91\u3002"), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onOpenTable, icon: "panel-top" }, "\u6253\u5F00\u5206\u955C\u5DE5\u4F5C\u53F0"), /* @__PURE__ */ React.createElement(Secondary, { icon: "users" }, "\u67E5\u770B\u4EBA\u7269 / \u573A\u666F / \u9053\u5177"))));
  }
  function ImportJobCard({ onPause, onFail, onDone }) {
    const [tick, setTick] = useState(0);
    const lines = [
      "\u6B63\u5728\u8BC6\u522B\u955C\u53F7\u3001\u753B\u9762\u63CF\u8FF0\u548C\u5BF9\u767D\u8FB9\u754C\uFF0C\u6B63\u5728\u628A\u8FDE\u7EED\u6BB5\u843D\u62C6\u6210\u53EF\u7F16\u8F91\u7247\u6BB5...",
      "\u6B63\u5728\u6574\u7406\u4EBA\u7269\u540D\u79F0\u548C\u9996\u6B21\u51FA\u73B0\u4F4D\u7F6E\uFF0C\u5E76\u540C\u6B65\u63D0\u53D6\u573A\u666F\u4E0E\u5173\u952E\u9053\u5177...",
      "\u6B63\u5728\u5199\u5165\u5206\u955C\u8868\uFF0C\u4E16\u754C\u89C2\u548C\u6B63\u6587\u5C06\u4F5C\u4E3A\u517C\u5BB9\u5185\u5BB9\u53CD\u5411\u751F\u6210..."
    ];
    useEffect(() => {
      const timer = setInterval(() => setTick((v) => (v + 1) % lines.length), 2500);
      return () => clearInterval(timer);
    }, []);
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:19" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u6B63\u5728\u5BFC\u5165\u5267\u672C\u7ED3\u6784", icon: "activity", badge: "Agent \u5DE5\u4F5C\u4E2D" }), /* @__PURE__ */ React.createElement("div", { className: "p-5 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-[#f8fbff] p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted" }, "\u5F53\u524D\u8FDB\u7A0B"), /* @__PURE__ */ React.createElement("div", { className: "mt-1 flex items-center gap-2 font-extrabold" }, /* @__PURE__ */ React.createElement("span", { className: "h-2 w-2 rounded-full bg-blue shadow-[0_0_0_4px_rgba(63,124,255,.12)]" }), "\u7ED3\u6784\u5316\u5206\u955C")), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-blue" }, "\u5904\u7406\u4E2D")), /* @__PURE__ */ React.createElement("div", { className: "mt-3 h-2 rounded-full bg-slate-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-full w-[58%] rounded-full bg-gradient-to-r from-good to-blue" }))), /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-[#f8fbff] p-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold text-muted" }, "\u5B8C\u6210\u60C5\u51B5"), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-sm leading-6 text-slate-700" }, "\u5DF2\u8BFB\u53D6\u5168\u6587\uFF0C\u5B8C\u6210\u7247\u6BB5\u62C6\u5206\uFF1B\u5F53\u524D\u5DF2\u5F62\u6210 ", /* @__PURE__ */ React.createElement("b", null, "86"), " \u6761\u5206\u955C\u3001", /* @__PURE__ */ React.createElement("b", null, "23"), " \u4E2A\u7247\u6BB5\uFF0C\u5E76\u8BC6\u522B ", /* @__PURE__ */ React.createElement("b", null, "8"), " \u4E2A\u4EBA\u7269\u3001", /* @__PURE__ */ React.createElement("b", null, "12"), " \u4E2A\u573A\u666F\u3001", /* @__PURE__ */ React.createElement("b", null, "17"), " \u4E2A\u9053\u5177\u3002")), /* @__PURE__ */ React.createElement("div", { className: "h-12 rounded-xl border border-line bg-white px-4 flex items-center gap-3 overflow-hidden" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-muted shrink-0" }, "\u6D41\u5F0F\u8F93\u51FA"), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 whitespace-nowrap overflow-hidden text-sm text-slate-600 fade-left direction-rtl" }, /* @__PURE__ */ React.createElement("span", { className: "inline-block direction-ltr" }, lines[tick]))), /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-white px-4 py-3 text-sm text-slate-600" }, "\u5206\u955C\u4E25\u683C\u6309\u539F\u59CB\u811A\u672C\u7ED3\u6784\u5316\uFF1B\u4E16\u754C\u89C2\u3001\u6B63\u6587\u548C\u5927\u7EB2\u53EF\u4F5C\u4E3A\u517C\u5BB9\u5185\u5BB9\u53CD\u5411\u751F\u6210\uFF0C\u4F46\u4E0D\u4F1A\u53CD\u5411\u6539\u5199\u5DF2\u5BFC\u5165\u5206\u955C\u3002")), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onPause, icon: "pause" }, "\u6682\u505C\u5BFC\u5165"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onDone, icon: "check-circle-2" }, "\u6A21\u62DF\u5B8C\u6210"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onFail, icon: "triangle-alert" }, "\u6A21\u62DF\u5931\u8D25"))));
  }
  function PauseCard({ onResume }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:06" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u5BFC\u5165\u5DF2\u6682\u505C", icon: "pause-circle", badge: "\u53EF\u7EE7\u7EED" }), /* @__PURE__ */ React.createElement("div", { className: "px-5 py-4 text-sm leading-7 text-slate-700" }, "\u5DF2\u6682\u505C\u5728 ", /* @__PURE__ */ React.createElement("b", null, "\u7ED3\u6784\u5316\u5206\u955C"), "\u3002\u5F53\u524D\u5DF2\u4FDD\u7559 23 \u4E2A\u7247\u6BB5\u548C 86 \u6761\u5206\u955C\u8349\u7A3F\uFF1B\u6682\u505C\u540E\u4E0D\u4F1A\u7EE7\u7EED\u6D88\u8017\u79EF\u5206\uFF0C\u7EE7\u7EED\u5BFC\u5165\u4F1A\u4ECE\u5F53\u524D\u8FDB\u7A0B\u6062\u590D\u3002"), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onResume, icon: "play" }, "\u7EE7\u7EED\u5BFC\u5165"), /* @__PURE__ */ React.createElement(Secondary, { icon: "table-2" }, "\u67E5\u770B\u5DF2\u5BFC\u5165\u5185\u5BB9"))));
  }
  function ErrorCard({ onRetry, onReupload }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:24:38" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u5BFC\u5165\u4E2D\u65AD", icon: "circle-alert", badge: "\u53EF\u91CD\u8BD5", danger: true }), /* @__PURE__ */ React.createElement("div", { className: "px-5 py-4 text-sm leading-7 text-slate-700" }, "\u7ED3\u6784\u5316\u5206\u955C\u65F6\u51FA\u73B0\u5F02\u5E38\uFF0C\u5DF2\u4FDD\u7559\u5DF2\u5199\u5165\u7684\u7247\u6BB5\u548C\u5206\u955C\u3002\u4F60\u53EF\u4EE5\u91CD\u8BD5\u5F53\u524D\u8FDB\u7A0B\uFF1B\u5982\u679C\u518D\u6B21\u5931\u8D25\uFF0C\u53EF\u4EE5\u5148\u67E5\u770B\u5DF2\u5BFC\u5165\u5185\u5BB9\u6216\u91CD\u65B0\u4E0A\u4F20\u6587\u672C\u3002"), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onRetry, icon: "refresh-cw" }, "\u91CD\u8BD5\u5F53\u524D\u8FDB\u7A0B"), /* @__PURE__ */ React.createElement(Secondary, { icon: "table-2" }, "\u67E5\u770B\u5DF2\u5BFC\u5165\u5185\u5BB9"), /* @__PURE__ */ React.createElement(Secondary, { onClick: onReupload, icon: "file-plus-2" }, "\u91CD\u65B0\u9009\u62E9\u6587\u4EF6"))));
  }
  function CompleteCard({ onOpenTable }) {
    return /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:26:02" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "\u5BFC\u5165\u5B8C\u6210", icon: "check-check", badge: "\u5DF2\u5199\u5165\u9879\u76EE" }), /* @__PURE__ */ React.createElement("div", { className: "px-5 py-4 text-sm leading-7 text-slate-700" }, "\u5DF2\u5B8C\u6210\u5BFC\u5165\uFF1A\u521B\u5EFA 1 \u4E2A\u672A\u5206\u96C6\u300123 \u4E2A\u7247\u6BB5\u300186 \u6761\u5206\u955C\uFF0C\u63D0\u53D6 8 \u4E2A\u4EBA\u7269\u300112 \u4E2A\u573A\u666F\u300117 \u4E2A\u9053\u5177\u3002\u672A\u8BC6\u522B\u5230\u660E\u786E\u5206\u96C6\u7ED3\u6784\uFF0C\u5DF2\u5148\u6309\u201C\u672A\u5206\u96C6 / \u7B2C 1 \u96C6\u201D\u5BFC\u5165\uFF0C\u8BE5\u8282\u70B9\u4EC5\u4F5C\u4E3A\u7ED3\u6784\u5BB9\u5668\u3002\u4E16\u754C\u89C2\u548C\u6B63\u6587\u5DF2\u4F5C\u4E3A\u8F85\u52A9\u5185\u5BB9\u751F\u6210\uFF0C\u4E0D\u4F1A\u53CD\u5411\u5F71\u54CD\u5206\u955C\u3002"), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Primary, { onClick: onOpenTable, icon: "panel-top" }, "\u6253\u5F00\u5206\u955C\u5DE5\u4F5C\u53F0"), /* @__PURE__ */ React.createElement(Secondary, { icon: "users" }, "\u67E5\u770B\u4EBA\u7269 / \u573A\u666F / \u9053\u5177"))));
  }
  function AgentMessage({ time, children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-[38px_minmax(0,760px)] gap-4 mb-7" }, /* @__PURE__ */ React.createElement("div", { className: "brand-mark h-9 w-9 rounded-full grid place-items-center text-white font-black" }, "S"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-xs text-slate-400 mb-2" }, /* @__PURE__ */ React.createElement("b", { className: "text-ink text-sm" }, "\u5851\u68A6"), time), children));
  }
  function Card({ children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-line bg-white shadow-soft overflow-hidden" }, children);
  }
  function CardHeader({ title, icon, badge, danger }) {
    return /* @__PURE__ */ React.createElement("div", { className: "h-16 px-5 border-b border-line flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "font-extrabold text-lg flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 20 }), " ", title), badge && /* @__PURE__ */ React.createElement("span", { className: `h-8 px-3 rounded-full text-xs font-extrabold flex items-center gap-2 ${danger ? "bg-rose-50 text-danger" : "bg-blue-50 text-blue"}` }, /* @__PURE__ */ React.createElement(Icon, { name: danger ? "refresh-cw" : "check-circle-2", size: 14 }), " ", badge));
  }
  function Info({ label, value, note, className = "" }) {
    return /* @__PURE__ */ React.createElement("div", { className: `rounded-lg border border-[#edf2f8] bg-[#f7f9fc] p-4 min-h-[74px] ${className}` }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-400 mb-2" }, label), /* @__PURE__ */ React.createElement("div", { className: "font-extrabold leading-6" }, value), note && /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-xs text-muted" }, note));
  }
  function CardActions({ children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "px-5 pb-5 flex flex-wrap items-center gap-3" }, children);
  }
  function Primary({ children, icon, onClick }) {
    return /* @__PURE__ */ React.createElement("button", { onClick, className: "h-10 px-5 rounded-full bg-navy text-white font-extrabold flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 17 }), " ", children);
  }
  function Secondary({ children, icon, onClick }) {
    return /* @__PURE__ */ React.createElement("button", { onClick, className: "h-10 px-4 rounded-full bg-white border border-line text-slate-700 font-bold flex items-center gap-2 hover:bg-slate-50" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 17 }), " ", children);
  }
  function RightPanel({ status }) {
    const isMultimodal = ["mediaText", "imageUnderstanding", "sceneUnderstanding", "videoUnderstanding", "audioUnderstanding", "documentUnderstanding", "mediaGenerating", "generatedAsset", "bindConfirm", "bindSuccess"].includes(status);
    return /* @__PURE__ */ React.createElement("aside", { className: "min-w-0 border-l border-line bg-[#f7f9fd] px-5 py-7 overflow-y-auto scrollbar-thin" }, /* @__PURE__ */ React.createElement("div", { className: "h-10 rounded-xl bg-slate-100 p-1 grid grid-cols-3 gap-1 mb-5" }, ["\u5185\u5BB9", "\u6982\u8FF0", "\u961F\u5217"].map((tab, index) => /* @__PURE__ */ React.createElement("button", { key: tab, className: `rounded-lg font-bold text-sm ${index === 1 ? "bg-white shadow-soft" : "text-slate-500"}` }, tab))), /* @__PURE__ */ React.createElement(SideCard, { title: "\u9879\u76EE\u8BBE\u5B9A" }, /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u9898\u6750", value: "\u60AC\u7591\u53CD\u8F6C" }), /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u96C6\u6570", value: "\u89C4\u5219\u8BC6\u522B 12 \u96C6" }), /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u89C6\u89C9\u98CE\u683C", value: "\u51B7\u8272\u591C\u666F" }), /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u76EE\u6807\u5E73\u53F0", value: "\u77ED\u89C6\u9891" })), /* @__PURE__ */ React.createElement(SideCard, { title: "\u5BFC\u5165\u7ED3\u6784" }, ["\u672A\u5206\u96C6 / \u7B2C 1 \u96C6", "\u7247\u6BB5 01\uFF1A\u6DF1\u591C\u6797\u5730", "\u7247\u6BB5 02\uFF1A\u65E7\u8B66\u5C40", "\u7247\u6BB5 03\uFF1A\u5BA1\u8BAF\u5BA4"].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: item, className: "min-h-9 rounded-lg bg-slate-50 px-3 py-2 mb-2 text-sm flex justify-between gap-3" }, /* @__PURE__ */ React.createElement("span", null, item), /* @__PURE__ */ React.createElement("b", null, i === 0 ? "86 \u955C" : `${[9, 14, 11][i - 1]} \u955C`)))), isMultimodal && /* @__PURE__ */ React.createElement(SideCard, { title: "\u591A\u6A21\u6001\u72B6\u6001" }, /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u5F53\u524D\u7D20\u6750", value: status === "generatedAsset" || status === "bindConfirm" || status === "bindSuccess" ? "\u4E34\u65F6\u89D2\u8272\u5F62\u8C61\u56FE" : "\u5BF9\u8BDD\u9644\u4EF6" }), /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u7406\u89E3\u7ED3\u679C", value: ["imageUnderstanding", "sceneUnderstanding", "videoUnderstanding", "audioUnderstanding", "documentUnderstanding"].includes(status) ? "\u5DF2\u8F93\u51FA" : "\u5F85\u786E\u8BA4" }), /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u751F\u6210\u7ED3\u679C", value: status === "generatedAsset" || status === "bindConfirm" || status === "bindSuccess" ? "\u5DF2\u751F\u6210" : "\u672A\u751F\u6210" }), /* @__PURE__ */ React.createElement(SummaryRow, { label: "\u5199\u56DE\u72B6\u6001", value: status === "bindSuccess" ? "\u5DF2\u7ED1\u5B9A" : status === "bindConfirm" ? "\u5F85\u786E\u8BA4" : "\u672A\u5199\u5165" }), /* @__PURE__ */ React.createElement("div", { className: "mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs leading-5 text-blue" }, "\u7D20\u6750\u4E0D\u4F1A\u81EA\u52A8\u8FDB\u8D44\u4EA7\u5E93\uFF1B\u5F53\u7528\u6237\u660E\u786E\u8BBE\u7F6E\u76EE\u6807\u540E\uFF0C\u624D\u5199\u5165\u89D2\u8272\u3001\u573A\u666F\u3001\u955C\u5934\u6216\u9879\u76EE\u8D44\u6599\u3002")), /* @__PURE__ */ React.createElement(SideCard, { title: "\u517C\u5BB9\u8BF4\u660E" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm leading-6 text-slate-600" }, "\u5206\u955C\u4E25\u683C\u6309\u7528\u6237\u539F\u59CB\u811A\u672C\u7ED3\u6784\u5316\uFF1B\u4E16\u754C\u89C2\u3001\u6B63\u6587\u548C\u5927\u7EB2\u53EF\u4F5C\u4E3A\u517C\u5BB9\u5185\u5BB9\u53CD\u5411\u751F\u6210\uFF0C\u4F46\u4E0D\u4F1A\u53CD\u5411\u6539\u5199\u5DF2\u5BFC\u5165\u5206\u955C\u3002")));
  }
  function SideCard({ title, children }) {
    return /* @__PURE__ */ React.createElement("section", { className: "rounded-xl border border-[#e4ebf5] bg-white p-4 mb-4" }, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-extrabold text-slate-500 mb-3" }, title), children);
  }
  function SummaryRow({ label, value }) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-8 flex items-center justify-between gap-4 text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, label), /* @__PURE__ */ React.createElement("b", null, value));
  }
  function ChatComposer({ onSubmit }) {
    const [text, setText] = useState("");
    const [attachment, setAttachment] = useState(null);
    const inputRef = useRef(null);
    const submit = () => {
      const value = text.trim();
      if (!value && !attachment) return;
      onSubmit == null ? void 0 : onSubmit(value, attachment);
      setText("");
      setAttachment(null);
    };
    const pickFile = (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) setAttachment(attachmentFromFile(file));
      event.target.value = "";
    };
    return /* @__PURE__ */ React.createElement("div", { className: "mx-auto mb-5 w-[min(900px,calc(100%-64px))] rounded-3xl border border-[#d8e4f2] bg-white shadow-soft overflow-hidden" }, /* @__PURE__ */ React.createElement("input", { ref: inputRef, type: "file", className: "hidden", onChange: pickFile, accept: ".md,.txt,.doc,.docx,.pdf,.png,.jpg,.jpeg,.webp,.mp4,.mov,.webm,.mp3,.wav,.m4a" }), attachment && /* @__PURE__ */ React.createElement("div", { className: "px-5 pt-4" }, /* @__PURE__ */ React.createElement(AttachmentChip, { attachment, onRemove: () => setAttachment(null) })), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: text,
        onChange: (event) => setText(event.target.value),
        className: "h-16 w-full resize-none outline-none px-5 pt-4 text-sm",
        placeholder: attachment ? "\u8865\u5145\u4E00\u53E5\u6307\u4EE4\uFF0C\u6216\u76F4\u63A5\u53D1\u9001\u6587\u4EF6\u3002" : "\u7EE7\u7EED\u548C Agent \u8BA8\u8BBA\u8FD9\u4E2A\u9879\u76EE\u3002"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "h-12 px-5 flex items-center gap-4" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.click();
    }, className: "h-10 w-10 rounded-full border border-line grid place-items-center text-slate-600" }, /* @__PURE__ */ React.createElement(Icon, { name: "plus" })), /* @__PURE__ */ React.createElement("button", { className: "text-sm flex items-center gap-2 text-slate-700" }, /* @__PURE__ */ React.createElement(Icon, { name: "sparkles", size: 17 }), "Agent \u6A21\u5F0F"), /* @__PURE__ */ React.createElement("button", { className: "text-sm flex items-center gap-2 text-slate-700" }, /* @__PURE__ */ React.createElement(Icon, { name: "sliders-horizontal", size: 17 }), "\u6A21\u578B\u504F\u597D ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "text-sm flex items-center gap-2 text-slate-700" }, /* @__PURE__ */ React.createElement(Icon, { name: "rectangle-horizontal", size: 17 }), "16:9 ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { onClick: submit, className: `ml-auto h-10 w-10 rounded-full grid place-items-center ${text.trim() || attachment ? "bg-navy text-white" : "bg-slate-100 text-slate-400"}` }, /* @__PURE__ */ React.createElement(Icon, { name: "arrow-up" }))));
  }
  function ChatView({ onOpenTable, onReupload, initialKind, initialAttachment }) {
    const mediaKinds = ["image", "video", "audio", "document"];
    const phaseForKind = (kind) => kind === "other" ? "otherText" : mediaKinds.includes(kind) ? "mediaText" : "initial";
    const seedAttachment = initialAttachment || sampleAttachments[initialKind] || sampleAttachments.script;
    const [phase, setPhase] = useState(phaseForKind(initialKind));
    const [activeKind, setActiveKind] = useState(initialKind);
    const [bindTarget, setBindTarget] = useState("\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61");
    const [bindSource, setBindSource] = useState("\u4E34\u65F6\u89D2\u8272\u5F62\u8C61\u56FE");
    const [userReplies, setUserReplies] = useState([]);
    const hasAdaptDetails = (value) => /(集|字数|短视频|平台|短篇|中篇|长篇|你来建议|建议)/.test(value);
    const requestBind = (value, options = {}) => {
      if (/镜头1|镜头/.test(value)) {
        setBindTarget("\u7B2C 1 \u96C6\u955C\u5934 1 \u7684\u53C2\u8003\u89C6\u9891");
        setBindSource("\u96E8\u591C\u5DF7\u53E3_\u53C2\u8003\u89C6\u9891.mp4");
      } else if (/音频|旁白/.test(value)) {
        setBindTarget("\u9879\u76EE\u97F3\u9891\u8D44\u6599");
        setBindSource("\u4F4E\u58F0\u65C1\u767D_\u60C5\u7EEA\u53C2\u8003.wav");
      } else if (/场景/.test(value)) {
        setBindTarget("\u65E7\u6848\u5929\u53F0\u573A\u666F\u53C2\u8003");
        setBindSource("\u5C4B\u9876\u591C\u666F_\u53C2\u8003\u56FE.png");
      } else if (/资料/.test(value)) {
        setBindTarget("\u9879\u76EE\u8D44\u6599");
        setBindSource("\u65E7\u6848\u80CC\u666F\u8D44\u6599.pdf");
      } else {
        setBindTarget("\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61");
        setBindSource(phase === "generatedAsset" ? "\u4E34\u65F6\u89D2\u8272\u5F62\u8C61\u56FE" : "\u5C4B\u9876\u591C\u666F_\u53C2\u8003\u56FE.png");
      }
      setPhase(options.needsQuestion ? "bindConfirm" : "bindSuccess");
    };
    const handleSubmit = (value, attachment) => {
      if (attachment) {
        setUserReplies((items) => [...items, { text: value, attachment }]);
        setActiveKind(attachment.kind);
        setPhase(phaseForKind(attachment.kind));
        return;
      }
      setUserReplies((items) => [...items, { text: value }]);
      if (phase === "otherText" && /改|分镜|短剧/.test(value)) {
        setPhase(hasAdaptDetails(value) ? "adaptConfirm" : "adaptAskDetails");
        return;
      }
      if (phase === "adaptAskDetails" && hasAdaptDetails(value)) {
        setPhase("adaptConfirm");
      }
      if (phase === "bindConfirm" && /覆盖|追加/.test(value)) {
        setPhase("bindSuccess");
        return;
      }
      if (/设置|设为|绑定/.test(value)) {
        requestBind(value);
        return;
      }
      if (/生成.*图|角色形象图|同风格场景图/.test(value)) {
        setPhase("mediaGenerating");
        return;
      }
      if (/提取角色|角色形象|提示词/.test(value)) {
        setPhase("imageUnderstanding");
        return;
      }
      if (/分析场景|场景风格|场景参考/.test(value)) {
        setPhase("sceneUnderstanding");
        return;
      }
      if (/查看基础|视频|镜头参考|节奏/.test(value)) {
        setPhase("videoUnderstanding");
        return;
      }
      if (/音频|旁白|配音|音乐/.test(value)) {
        setPhase("audioUnderstanding");
        return;
      }
      if (/总结资料|角色场景线索|资料/.test(value)) {
        setPhase("documentUnderstanding");
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: "h-full grid grid-cols-[minmax(0,1fr)_minmax(300px,360px)] overflow-hidden" }, /* @__PURE__ */ React.createElement("main", { className: "min-h-0 grid grid-rows-[minmax(0,1fr)_auto] bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-y-auto scrollbar-thin px-16 py-10" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[880px] mx-auto" }, /* @__PURE__ */ React.createElement(FileUserMessage, { attachment: seedAttachment, text: initialKind === "script" ? "\u5E2E\u6211\u5BFC\u5165\u8FD9\u4E2A\u5206\u955C\u811A\u672C" : "" }), /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:08" }, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, "\u5DF2\u6536\u5230 @", seedAttachment.name, "\u3002\u6211\u5148\u8BFB\u53D6\u5FC5\u8981\u7247\u6BB5\uFF0C\u505A\u4E00\u6B21\u521D\u6B65\u7406\u89E3\u3002")), phase === "initial" && /* @__PURE__ */ React.createElement(InitialCard, { onStart: () => setPhase("running"), onReupload }), phase === "otherText" && /* @__PURE__ */ React.createElement(OtherTextIntentMessage, { onQuickReply: handleSubmit }), phase === "mediaText" && /* @__PURE__ */ React.createElement(MediaIntentMessage, { kind: activeKind, onQuickReply: handleSubmit }), userReplies.map((reply, index) => {
      var _a;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: `${reply.text || ((_a = reply.attachment) == null ? void 0 : _a.name)}-${index}` }, reply.attachment ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FileUserMessage, { attachment: reply.attachment, text: reply.text }), /* @__PURE__ */ React.createElement(AgentMessage, { time: "2026/06/17 14:23:08" }, /* @__PURE__ */ React.createElement("div", { className: "text-[15px] leading-7 text-slate-700" }, "\u5DF2\u6536\u5230 @", reply.attachment.name, "\u3002\u6211\u5148\u8BFB\u53D6\u5FC5\u8981\u7247\u6BB5\uFF0C\u505A\u4E00\u6B21\u521D\u6B65\u7406\u89E3\u3002"))) : /* @__PURE__ */ React.createElement(UserMessage, null, reply.text));
    }), phase === "adaptAskDetails" && /* @__PURE__ */ React.createElement(AdaptDetailsQuestion, { onQuickReply: handleSubmit }), phase === "adaptConfirm" && /* @__PURE__ */ React.createElement(AdaptConfirmCard, { onStart: () => setPhase("adaptRunning") }), phase === "adaptRunning" && /* @__PURE__ */ React.createElement(AdaptJobCard, { onPause: () => setPhase("adaptPaused"), onDone: () => setPhase("adaptComplete") }), phase === "adaptPaused" && /* @__PURE__ */ React.createElement(PauseCard, { onResume: () => setPhase("adaptRunning") }), phase === "adaptComplete" && /* @__PURE__ */ React.createElement(AdaptCompleteCard, { onOpenTable }), phase === "imageUnderstanding" && /* @__PURE__ */ React.createElement(ImageUnderstandingResult, { onQuickReply: handleSubmit }), phase === "sceneUnderstanding" && /* @__PURE__ */ React.createElement(SceneUnderstandingResult, { onQuickReply: handleSubmit }), phase === "videoUnderstanding" && /* @__PURE__ */ React.createElement(VideoUnderstandingResult, { onQuickReply: handleSubmit }), phase === "audioUnderstanding" && /* @__PURE__ */ React.createElement(AudioUnderstandingResult, { onQuickReply: handleSubmit }), phase === "documentUnderstanding" && /* @__PURE__ */ React.createElement(DocumentUnderstandingResult, { onQuickReply: handleSubmit }), phase === "mediaGenerating" && /* @__PURE__ */ React.createElement(MultimodalGenerationCard, { onPause: () => setPhase("mediaText"), onDone: () => setPhase("generatedAsset") }), phase === "generatedAsset" && /* @__PURE__ */ React.createElement(GeneratedAssetCard, { onRegenerate: () => setPhase("mediaGenerating"), onBind: () => requestBind("\u8BBE\u7F6E\u4E3A\u6797\u71C3\u7684\u89D2\u8272\u5F62\u8C61") }), phase === "bindConfirm" && /* @__PURE__ */ React.createElement(BindingQuestionMessage, { target: bindTarget, source: bindSource, onQuickReply: handleSubmit }), phase === "bindSuccess" && /* @__PURE__ */ React.createElement(BindingSuccessMessage, { target: bindTarget }), phase === "running" && /* @__PURE__ */ React.createElement(ImportJobCard, { onPause: () => setPhase("paused"), onFail: () => setPhase("error"), onDone: () => setPhase("complete") }), phase === "paused" && /* @__PURE__ */ React.createElement(PauseCard, { onResume: () => setPhase("running") }), phase === "error" && /* @__PURE__ */ React.createElement(ErrorCard, { onRetry: () => setPhase("running"), onReupload }), phase === "complete" && /* @__PURE__ */ React.createElement(CompleteCard, { onOpenTable }))), /* @__PURE__ */ React.createElement(ChatComposer, { onSubmit: handleSubmit })), /* @__PURE__ */ React.createElement(RightPanel, { status: phase }));
  }
  function StoryboardView({ onBack }) {
    const shots = [
      {
        title: "\u955C\u59341",
        time: "12s",
        scene: "\u6C7D\u4FEE\u5382\u540E\u5DF7\u9601\u697C",
        people: "\u6797\u71C3",
        text: [
          "\u3010\u56FA\u5B9A\u951A\u70B9\u3011\uFF1A\u9601\u697C\u7A97\u524D\u3002\u6797\u71C3\u80CC\u5BF9\u955C\u5934\uFF0C\u6307\u5C16\u7D27\u634F\u4E00\u679A\u9508\u8680\u94DC\u94C3\uFF0C\u8EAB\u4F53\u91CD\u5FC3\u56E0\u7D27\u5F20\u800C\u50F5\u786C\u3002",
          "0\u79D2-4\u79D2\uFF1A\u5168\u666F + \u5E73\u89C6 + \u56FA\u5B9A\u4F4D\uFF0C\u7A97\u5916\u5BC6\u4E91\u5149\u900F\u8FC7\u7834\u74E6\u7F1D\u9699\uFF0C\u753B\u9762\u8FB9\u7F18\u6709\u8F7B\u5FAE\u5F31\u7684\u73B0\u5B9E\u88C2\u75D5\u3002",
          "4\u79D2-8\u79D2\uFF1A\u8FD1\u666F + \u4F4E\u673A\u4F4D + \u6162\u63A8\uFF0C\u6797\u71C3\u4E0B\u988C\u6C81\u6C57\uFF0C\u7EB8\u9875\u8FB9\u7F18\u56E0\u53D7\u6F6E\u5377\u8D77\u3002",
          "8\u79D2-12\u79D2\uFF1A\u7279\u5199 + \u4FEF\u62CD\uFF0C\u624B\u673A\u58C1\u864E\u3001\u94DC\u94C3\u548C\u5C18\u57C3\u4E00\u540C\u5165\u753B\uFF0C\u542C\u89C1\u8FDC\u5904\u811A\u6B65\u58F0\u3002"
        ],
        dialogue: "\u2014"
      },
      {
        title: "\u955C\u59342",
        time: "13s",
        scene: "\u6C7D\u4FEE\u5382\u540E\u5DF7\u9601\u697C",
        people: "\u6797\u71C3",
        text: [
          "\u3010\u56FA\u5B9A\u951A\u70B9\u3011\uFF1A\u95E8\u7F1D\u5904\u7684\u9006\u5149\u3002\u6797\u71C3\u628A\u94DC\u94C3\u6536\u8FDB\u8896\u53E3\uFF0C\u80CC\u540E\u4F20\u6765\u94A5\u5319\u8F7B\u54CD\u3002",
          "0\u79D2-6\u79D2\uFF1A\u4E2D\u666F + \u624B\u6301\uFF0C\u955C\u5934\u8DDF\u968F\u4ED6\u9000\u5230\u5899\u8FB9\uFF0C\u7126\u70B9\u5728\u95E8\u9501\u548C\u4ED6\u7684\u547C\u5438\u4E4B\u95F4\u5207\u6362\u3002",
          "6\u79D2-13\u79D2\uFF1A\u7279\u5199 + \u5FEB\u5207\uFF0C\u706F\u6CE1\u95EA\u70C1\u4E24\u6B21\uFF0C\u95E8\u5916\u4EBA\u5F71\u505C\u4F4F\u3002"
        ],
        dialogue: "\u6797\u71C3\u4F4E\u58F0\uFF1A\u522B\u54CD\u3002"
      }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "h-full bg-white grid grid-rows-[58px_48px_minmax(0,1fr)_124px] overflow-hidden" }, /* @__PURE__ */ React.createElement("header", { className: "border-b border-line px-6 flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "h-7 w-7 rounded-full bg-[#eef0ff] text-brand grid place-items-center" }, /* @__PURE__ */ React.createElement(Icon, { name: "grid-2x2", size: 15 })), /* @__PURE__ */ React.createElement("div", { className: "font-extrabold" }, "\u7B2C1\u96C6 \xB7 \u94C3\u54CD\u4E09\u79D2"), /* @__PURE__ */ React.createElement("button", { className: "h-8 px-4 rounded-full border border-line bg-white text-sm font-bold flex items-center gap-2" }, "v1\uFF08\u5F53\u524D\uFF09", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("div", { className: "ml-auto flex items-center gap-6 text-sm text-slate-600" }, /* @__PURE__ */ React.createElement("button", { className: "flex items-center gap-1" }, "16:9 ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "flex items-center gap-1" }, "1080P ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "flex items-center gap-1" }, "\u65E0\u5B57\u5E55 ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "flex items-center gap-1" }, "\u5206\u955C\u6545\u4E8B\u677F\u6A21\u5F0F ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "font-bold text-ink flex items-center gap-1" }, "\u5BFC\u51FA ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "h-8 px-4 rounded-full border border-line bg-white text-slate-600 font-bold" }, "\u91CD\u65B0\u89C4\u5212\u5206\u955C ", /* @__PURE__ */ React.createElement("span", { className: "text-brand" }, "0.11")), /* @__PURE__ */ React.createElement("button", { onClick: onBack, className: "h-9 w-9 rounded-full bg-slate-100 text-slate-500 grid place-items-center" }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 18 })))), /* @__PURE__ */ React.createElement("nav", { className: "px-5 flex items-center gap-7 border-b border-[#eef2fb] text-sm" }, [["\u7247\u6BB5\u4E00 \xB7 2\u4E2A", true], ["\u7247\u6BB5\u4E8C \xB7 3\u4E2A", false], ["\u7247\u6BB5\u4E09 \xB7 4\u4E2A", false]].map(([label, active]) => /* @__PURE__ */ React.createElement("button", { key: label, className: `flex items-center gap-2 font-bold ${active ? "text-ink" : "text-[#9aacbf]"}` }, /* @__PURE__ */ React.createElement("span", { className: `h-3.5 w-3.5 rounded-full border-4 ${active ? "border-brand" : "border-[#e6edf7]"}` }), label))), /* @__PURE__ */ React.createElement("main", { className: "min-h-0 bg-[#f7f8ff] p-4 overflow-y-auto scrollbar-thin" }, /* @__PURE__ */ React.createElement("section", { className: "rounded-2xl border border-[#e4e8fb] bg-white shadow-soft overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-[60px] bg-[#f0edff] px-5 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("b", { className: "text-sm" }, "\u7EF4\u5EA6\u5D29\u584C"), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-500" }, "\u6838\u5FC3\u573A\u666F\uFF1A"), /* @__PURE__ */ React.createElement(Pill, { icon: "map-pin", text: "\u6C7D\u4FEE\u5382\u540E\u5DF7\u9601\u697C\u3001\u865A\u65E0\u7F1D\u9699\u7A7A\u95F4" }), /* @__PURE__ */ React.createElement("button", { className: "h-8 px-3 rounded-full border border-[#d8e3f1] bg-white text-sm text-slate-600 flex items-center gap-1" }, "\u51FA\u573A\u89D2\u8272 ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("div", { className: "ml-auto flex gap-3" }, /* @__PURE__ */ React.createElement("button", { className: "h-10 px-5 rounded-full bg-brand text-white font-extrabold" }, "\u751F\u6210\u5206\u955C\u6545\u4E8B\u677F"), /* @__PURE__ */ React.createElement("button", { className: "h-10 px-5 rounded-full bg-brand text-white font-extrabold" }, "\u751F\u6210\u7247\u6BB5\u89C6\u9891"))), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-5" }, shots.map((shot, index) => /* @__PURE__ */ React.createElement("div", { key: shot.title }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-[42%_16%_1fr] gap-3" }, /* @__PURE__ */ React.createElement(ShotCard, { shot }), /* @__PURE__ */ React.createElement(MediaPlaceholder, { label: "\u6682\u65E0\u6545\u4E8B\u677F\u56FE" }), /* @__PURE__ */ React.createElement(MediaPlaceholder, { label: "\u6682\u65E0\u5206\u955C\u89C6\u9891", wide: true })), index === 0 && /* @__PURE__ */ React.createElement("div", { className: "h-8 flex items-center justify-center text-xs text-[#b0bfd0]" }, "\u6B64\u5904\u53EF\u65B0\u589E\u5206\u955C")))))), /* @__PURE__ */ React.createElement("footer", { className: "border-t border-line bg-white grid grid-cols-[minmax(0,1fr)_112px] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto scrollbar-thin px-6 py-3 flex items-center gap-3" }, /* @__PURE__ */ React.createElement(TimelineMarker, { label: "\u7247\u6BB5\u4E00" }), ["\u955C\u59341 \xB7 \u9601\u697C\u66B4\u96E8\u624B\u673A", "\u955C\u59342 \xB7 \u94DC\u94C3\u9707\u98A4\u5760\u5165", "\u955C\u59341 \xB7 \u7EF4\u5EA6\u7741\u773C\u4E0E\u4F4E\u8BED", "\u955C\u59342 \xB7 \u51DD\u56FA\u7684\u6276\u624B\u65F6\u523B", "\u955C\u59343 \xB7 \u4FEE\u6B63\u89C4\u907F\u4E0E\u843D\u5730", "\u955C\u59341 \xB7 \u73B0\u5B9E\u91CD\u542F\u4E0E\u94C1\u67DC...", "\u955C\u59342 \xB7 \u9648\u9ED8\u73B0\u8EAB\u4E0E\u9012\u6273\u624B", "\u955C\u59343 \xB7 \u94DC\u94C3\u88C2\u75D5\u4E0E\u9886\u547D...", "\u955C\u59344 \xB7 \u5DE5\u724C\u5F02\u52A8\u4E0E\u6848\u5FCC..."].map((label, index) => /* @__PURE__ */ React.createElement(TimelineCard, { key: label, label, active: index === 0, time: ["00:12", "00:13", "00:07", "00:09", "00:12", "00:10", "00:15", "00:12", "00:10"][index] }))), /* @__PURE__ */ React.createElement("div", { className: "border-l border-line flex flex-col items-center justify-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "play", size: 14 }), " 01:40"), /* @__PURE__ */ React.createElement("button", { className: "h-9 px-4 rounded-full bg-[#8a6af5] text-white font-extrabold text-sm" }, "\u5408\u6210\u672C\u96C6"))));
  }
  function Pill({ icon, text }) {
    return /* @__PURE__ */ React.createElement("span", { className: "h-8 px-3 rounded-full border border-[#d8e3f1] bg-white text-xs text-slate-600 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 13 }), text);
  }
  function ShotCard({ shot }) {
    return /* @__PURE__ */ React.createElement("article", { className: "min-h-[316px] rounded-xl border border-[#d8e3f1] bg-white p-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-extrabold" }, shot.title), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 text-[#7d92ad]" }, /* @__PURE__ */ React.createElement(Icon, { name: "pencil", size: 16 }), /* @__PURE__ */ React.createElement(Icon, { name: "trash-2", size: 16 }))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[#7890ad] mb-5" }, /* @__PURE__ */ React.createElement("span", null, "\u65F6\u957F\uFF1A", /* @__PURE__ */ React.createElement("b", { className: "text-slate-700" }, shot.time)), /* @__PURE__ */ React.createElement("span", null, "\u573A\u666F\uFF1A", /* @__PURE__ */ React.createElement(Pill, { icon: "map-pin", text: shot.scene })), /* @__PURE__ */ React.createElement("span", null, "\u4EBA\u7269\uFF1A", /* @__PURE__ */ React.createElement(Pill, { icon: "user-round", text: shot.people }))), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#8ca1bb] mb-2" }, "\u753B\u9762\u63CF\u8FF0"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-sm leading-7 text-slate-700" }, shot.text.map((line) => /* @__PURE__ */ React.createElement("p", { key: line }, line))), /* @__PURE__ */ React.createElement("div", { className: "mt-5 text-sm text-[#8ca1bb]" }, "\u5BF9\u767D/\u65C1\u767D\uFF1A", /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, shot.dialogue)));
  }
  function MediaPlaceholder({ label, wide }) {
    return /* @__PURE__ */ React.createElement("div", { className: `relative min-h-[316px] rounded-xl bg-[#eef3f9] grid place-items-center text-[#8ea1b8] ${wide ? "" : ""}` }, /* @__PURE__ */ React.createElement("button", { className: "absolute right-3 top-3 h-6 w-6 rounded-full bg-slate-400/70 text-white grid place-items-center" }, /* @__PURE__ */ React.createElement(Icon, { name: "refresh-cw", size: 14 })), /* @__PURE__ */ React.createElement("div", { className: "text-center text-xs" }, /* @__PURE__ */ React.createElement(Icon, { name: "film", size: 24, className: "mx-auto mb-2 opacity-60" }), label));
  }
  function TimelineMarker({ label }) {
    return /* @__PURE__ */ React.createElement("div", { className: "h-20 w-7 shrink-0 border-x border-[#d8e3f1] text-xs text-[#8ea1b8] flex items-center justify-center [writing-mode:vertical-rl]" }, label);
  }
  function TimelineCard({ label, time, active }) {
    return /* @__PURE__ */ React.createElement("button", { className: `h-[78px] w-[140px] shrink-0 rounded-lg text-left ${active ? "border-2 border-brand bg-white" : "border border-transparent bg-[#edf2f8]"}` }, /* @__PURE__ */ React.createElement("div", { className: "h-14 grid place-items-center text-[#a7b6c8]" }, /* @__PURE__ */ React.createElement(Icon, { name: "film", size: 22 })), /* @__PURE__ */ React.createElement("div", { className: "px-2 pb-2 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "rounded bg-slate-500 px-1.5 py-0.5 text-[10px] text-white font-bold" }, time), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-600 truncate" }, label)));
  }
  function Home({ onSendAttachment }) {
    const [text, setText] = useState("");
    const [attachment, setAttachment] = useState(null);
    const inputRef = useRef(null);
    const pickFile = (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) setAttachment(attachmentFromFile(file));
      event.target.value = "";
    };
    const submit = () => {
      if (!text.trim() && !attachment) return;
      onSendAttachment == null ? void 0 : onSendAttachment(attachment || sampleAttachments.script, text.trim());
      setText("");
      setAttachment(null);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "h-full overflow-y-auto bg-[radial-gradient(circle_at_62%_18%,rgba(114,92,255,.10),transparent_30%),linear-gradient(180deg,#fff_0%,#f7fbff_100%)] px-14 py-12" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[920px] mx-auto text-center" }, /* @__PURE__ */ React.createElement("div", { className: "brand-mark h-11 w-11 mx-auto rounded-2xl grid place-items-center text-white font-black text-xl" }, "S"), /* @__PURE__ */ React.createElement("h1", { className: "mt-6 text-3xl font-extrabold" }, "\u5927\u9B54\u672F\u5E08\uFF08\u6B63\u5F0F\u7248\uFF09\uFF0C\u6B22\u8FCE\u6765\u5230\u5851\u68A6AI"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-muted" }, "AI \u9A71\u52A8\u7684\u77ED\u5267\u521B\u4F5C\u5DE5\u5382\u3002\u4ECE\u7075\u611F\u5230\u6210\u7247\uFF0C\u901A\u8FC7\u5BF9\u8BDD\u5B8C\u6210\u5168\u6D41\u7A0B\u3002"), /* @__PURE__ */ React.createElement("div", { className: "mt-8 mx-auto w-[850px] rounded-3xl border border-[#d8e4f2] bg-white shadow-soft overflow-hidden text-left" }, /* @__PURE__ */ React.createElement("input", { ref: inputRef, type: "file", className: "hidden", onChange: pickFile, accept: ".md,.txt,.doc,.docx,.pdf,.png,.jpg,.jpeg,.webp,.mp4,.mov,.webm,.mp3,.wav,.m4a" }), attachment && /* @__PURE__ */ React.createElement("div", { className: "px-6 pt-5" }, /* @__PURE__ */ React.createElement(AttachmentChip, { attachment, onRemove: () => setAttachment(null) })), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: text,
        onChange: (event) => setText(event.target.value),
        className: "h-36 w-full resize-none outline-none p-6",
        placeholder: attachment ? "\u8865\u5145\u4E00\u53E5\u6307\u4EE4\uFF0C\u6216\u76F4\u63A5\u53D1\u9001\u6587\u4EF6\u3002" : "\u63CF\u8FF0\u60F3\u6CD5\uFF0C\u4ECE\u8FD9\u91CC\u4E3A\u4F60\u5851\u68A6\u3002"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "h-14 px-5 flex items-center gap-4" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.click();
    }, className: "h-10 w-10 rounded-full border border-line grid place-items-center" }, /* @__PURE__ */ React.createElement(Icon, { name: "plus" })), /* @__PURE__ */ React.createElement("button", { className: "text-sm flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "sparkles", size: 17 }), "Agent \u6A21\u5F0F"), /* @__PURE__ */ React.createElement("button", { className: "text-sm flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "sliders-horizontal", size: 17 }), "\u6A21\u578B\u504F\u597D ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { className: "text-sm flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "rectangle-horizontal", size: 17 }), "16:9 ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })), /* @__PURE__ */ React.createElement("button", { onClick: submit, className: `ml-auto h-10 w-10 rounded-full grid place-items-center ${text.trim() || attachment ? "bg-navy text-white" : "bg-slate-100 text-slate-400"}` }, /* @__PURE__ */ React.createElement(Icon, { name: "arrow-up" })))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-3 text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, "\u539F\u578B\u6F14\u793A\u6587\u4EF6"), [
      ["\u5206\u955C\u811A\u672C", sampleAttachments.script],
      ["\u5C0F\u8BF4\u6587\u672C", sampleAttachments.other],
      ["\u53C2\u8003\u56FE", sampleAttachments.image],
      ["\u53C2\u8003\u89C6\u9891", sampleAttachments.video],
      ["\u97F3\u9891\u53C2\u8003", sampleAttachments.audio],
      ["\u8D44\u6599\u6587\u6863", sampleAttachments.document]
    ].map(([label, file]) => /* @__PURE__ */ React.createElement("button", { key: label, onClick: () => setAttachment(file), className: "h-9 px-4 rounded-full border border-line bg-white shadow-soft text-slate-600 inline-flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: file.icon, size: 15 }), label)))));
  }
  function App() {
    const initialScreen = new URLSearchParams(window.location.search).get("screen") === "storyboard" ? "table" : "home";
    const [screen, setScreen] = useState(initialScreen);
    const [importKind, setImportKind] = useState(new URLSearchParams(window.location.search).get("case") === "other" ? "other" : "script");
    const [activeAttachment, setActiveAttachment] = useState(sampleAttachments[importKind]);
    const handoff = (attachment = sampleAttachments.script) => {
      setImportKind(attachment.kind || "script");
      setActiveAttachment(attachment);
      setScreen("chat");
    };
    if (screen === "table") {
      return /* @__PURE__ */ React.createElement(StoryboardView, { onBack: () => setScreen("chat") });
    }
    return /* @__PURE__ */ React.createElement("div", { className: "h-full min-w-[1180px] flex" }, /* @__PURE__ */ React.createElement(Sidebar, null), /* @__PURE__ */ React.createElement("section", { className: "min-w-0 flex-1 grid grid-rows-[56px_1fr]" }, /* @__PURE__ */ React.createElement(Topbar, { mode: "chat" }), screen === "home" && /* @__PURE__ */ React.createElement(Home, { onSendAttachment: (attachment) => handoff(attachment) }), screen === "chat" && /* @__PURE__ */ React.createElement(ChatView, { initialKind: importKind, initialAttachment: activeAttachment, onOpenTable: () => setScreen("table"), onReupload: () => setScreen("home") })));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
