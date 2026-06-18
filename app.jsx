const { useEffect, useMemo, useState } = React;

    const { useRef } = React;

    const Icon = ({ name, size = 18, className = "" }) => {
      useEffect(() => { window.lucide?.createIcons(); });
      return <i data-lucide={name} width={size} height={size} className={className}></i>;
    };

    const projects = [
      ["我在废太子灵前，杀穿整个朝堂", "12集"],
      ["剑动力晋：废柴少年的逆天之路", "24集"],
      ["剑啸九天：废柴少年的逆天之路", "36集"],
      ["沉默，吉多尼亚葡萄", "12集"],
      ["md 沉默，吉多尼亚葡萄", "1集"],
      ["折梅", "1集"],
      ["盘点十大钟话事件", "12集"]
    ];

    const importStats = {
      title: "雪夜旧案",
      topic: "悬疑反转 / 都市旧案",
      style: "冷色夜景、室内低照度、写实悬疑",
      episodes: "12 集",
      summary: "一桩雪夜旧案被重新翻出，主角从遗留线索中追查真相，逐步发现当年的证词、现场与关键人物之间存在矛盾。",
      estimate: "约 120-180 积分"
    };

    const storyboardRows = [
      ["片段 01", "001", "俯拍黑风雪中的枯木，镜头快速推向驿站摇晃的木门。", "林清", "雪夜林地", "木门、灯笼"],
      ["片段 01", "002", "全景驿站内部，昏黄灯光下，林清正蹲在尸体旁。", "林清、尸体", "破旧驿站", "医药包"],
      ["片段 01", "003", "特写死者右手，指缝间夹着半截带血的梅花枝。", "尸体", "破旧驿站", "梅花枝"],
      ["片段 02", "014", "中景林清用摄像头支起梅枝，眼神凝重。", "林清", "旧警局", "摄像头、梅花枝"],
      ["片段 02", "021", "近景旧案卷从柜中滑落，露出“雪梅案”三个字。", "林清", "警局走廊", "旧案卷"]
    ];

    const sampleAttachments = {
      script: { kind: "script", name: "雪夜旧案_分镜脚本.docx", type: "DOCX", size: "4.8 MB", icon: "file-text" },
      other: { kind: "other", name: "雪夜旧案_小说节选.docx", type: "DOCX", size: "3.1 MB", icon: "book-open-text" },
      image: { kind: "image", name: "屋顶夜景_参考图.png", type: "PNG", size: "2.4 MB", icon: "image" },
      video: { kind: "video", name: "雨夜巷口_参考视频.mp4", type: "MP4", size: "18.6 MB", icon: "video" },
      audio: { kind: "audio", name: "低声旁白_情绪参考.wav", type: "WAV", size: "6.2 MB", icon: "audio-lines" },
      document: { kind: "document", name: "旧案背景资料.pdf", type: "PDF", size: "2.8 MB", icon: "file-search" }
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
      const kind = classifyAttachment(file?.name);
      const ext = file?.name?.split(".").pop()?.toUpperCase() || "FILE";
      const sizeMb = file?.size ? `${Math.max(file.size / 1024 / 1024, 0.1).toFixed(1)} MB` : "已选择";
      const iconMap = { script: "file-text", other: "book-open-text", image: "image", video: "video", audio: "audio-lines", document: "file-search" };
      return { kind, name: file?.name || sampleAttachments[kind]?.name || "未命名文件", type: ext, size: sizeMb, icon: iconMap[kind] || "paperclip" };
    }

    function AttachmentChip({ attachment, status = "上传成功", onRemove }) {
      if (!attachment) return null;
      return (
        <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-[#d8e4f2] bg-white px-3 py-2 shadow-soft">
          <span className="h-9 w-9 shrink-0 rounded-xl bg-[#eef3ff] text-blue grid place-items-center"><Icon name={attachment.icon || "paperclip"} size={18} /></span>
          <span className="min-w-0 text-left">
            <span className="block max-w-[420px] truncate text-sm font-extrabold text-ink">{attachment.name}</span>
            <span className="mt-0.5 flex items-center gap-2 text-xs text-muted">
              <span>{attachment.type}</span>
              <span>·</span>
              <span>{attachment.size}</span>
              <span>·</span>
              <span className="text-good font-bold">{status}</span>
            </span>
          </span>
          {onRemove && (
            <button onClick={onRemove} className="h-7 w-7 shrink-0 rounded-full text-slate-400 hover:bg-slate-100 hover:text-ink grid place-items-center">
              <Icon name="x" size={15} />
            </button>
          )}
        </div>
      );
    }

    function FileUserMessage({ attachment, text }) {
      return (
        <div className="flex justify-end mb-7">
          <div className="max-w-[560px] rounded-2xl bg-[#eef2ff] px-4 py-3 text-[15px] leading-7 text-ink">
            {text && <div className="mb-3">{text}</div>}
            <AttachmentChip attachment={attachment} status="已发送" />
          </div>
        </div>
      );
    }

    function Sidebar() {
      return (
        <aside className="h-full w-[320px] shrink-0 border-r border-line bg-white/95 flex flex-col">
          <div className="h-20 px-7 flex items-center gap-3">
            <div className="brand-mark h-8 w-8 rounded-xl grid place-items-center text-white font-black">S</div>
            <div className="font-extrabold text-xl">塑梦AI</div>
            <button className="ml-auto h-8 w-8 grid place-items-center rounded-lg text-slate-500 hover:bg-slate-100">
              <Icon name="panel-left" />
            </button>
          </div>
          <button className="mx-4 h-11 rounded-full bg-navy text-white font-bold flex items-center justify-center gap-2">
            <Icon name="plus" size={17} /> 新建会话
          </button>
          <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6">
            <NavTitle icon="shapes" label="资产库" />
            <NavTitle icon="folder" label="我的项目" chevron />
            <div className="space-y-1 mb-7">
              {projects.map(([name, count], index) => (
                <div key={name} className={`h-10 rounded-lg px-2 grid grid-cols-[18px_1fr_auto] items-center gap-2 text-sm ${index === 2 ? "bg-[#edf1ff] text-[#513fff]" : "text-slate-700 hover:bg-slate-50"}`}>
                  <span className="h-3 w-4 rounded-[3px] bg-gradient-to-br from-[#a68aff] to-[#6f8dff]"></span>
                  <span className="truncate">{name}</span>
                  <span className="text-xs text-slate-400">{count}</span>
                </div>
              ))}
            </div>
            <NavTitle icon="message-square" label="最近会话" chevron />
            {["Create a 1-episode costume suspense shor", "你好", "请创作一部修仙逆袭短剧：灵根被废的外门少年意...", "旧屋、录音笔、墙后有人，悬疑反转。"].map((item, index) => (
              <div key={item} className={`min-h-9 rounded-lg px-3 py-2 text-sm ${index === 0 ? "bg-[#edf1ff] text-[#513fff]" : "text-slate-600"}`}>{item}</div>
            ))}
          </div>
          <div className="border-t border-line bg-white px-4 py-3">
            <div className="h-9 border border-line rounded-lg px-3 flex items-center justify-between text-sm text-slate-600 mb-3">个人空间 <Icon name="chevron-down" size={15} /></div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold">大</div>
              <div>
                <div className="text-sm font-bold">大魔术师（正式版）</div>
                <div className="text-xs text-brand font-bold">闪电 6,218</div>
              </div>
            </div>
          </div>
        </aside>
      );
    }

    function NavTitle({ icon, label, chevron }) {
      return (
        <div className="h-9 flex items-center gap-2 text-sm font-bold text-ink">
          <Icon name={icon} size={18} /> {label}
          {chevron && <Icon name="chevron-down" size={15} className="ml-auto text-slate-500" />}
        </div>
      );
    }

    function Topbar({ mode }) {
      return (
        <header className="h-14 border-b border-line bg-white/90 backdrop-blur px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold">
            <Icon name={mode === "table" ? "table-2" : "message-square"} size={20} />
            {mode === "table" ? "雪夜旧案 · 分镜表" : "雪夜旧案 · 导入中"}
          </div>
          <div className="flex items-center gap-5 text-slate-500">
            <Icon name="panel-right" />
            <Icon name="sun" />
          </div>
        </header>
      );
    }

    function InitialCard({ onStart, onReupload }) {
      return (
        <AgentMessage time="2026/06/17 14:23:12">
          <Card>
            <CardHeader title="初步理解" icon="scan-text" />
            <div className="p-5 grid grid-cols-2 gap-3">
              <Info label="标题" value={importStats.title} />
              <Info label="题材" value={importStats.topic} />
              <Info label="视觉风格" value={importStats.style} />
              <Info label="集数" value={importStats.episodes} note="低成本规则命中才展示" />
              <Info className="col-span-2" label="故事概览" value={importStats.summary} />
            </div>
            <div className="mx-5 mb-4 rounded-xl border border-line bg-[#f8fbff] p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-muted mb-1">预估消耗</div>
                <div className="font-extrabold">{importStats.estimate}</div>
                <div className="text-xs text-muted mt-1 leading-5">按文本长度和解析复杂度估算，实际以导入完成后的用量为准。导入中可暂停。</div>
              </div>
              <span className="h-8 px-3 rounded-full bg-blue-50 text-blue font-extrabold text-xs flex items-center gap-2"><Icon name="zap" size={14} /> 开始前确认</span>
            </div>
            <CardActions>
              <Primary onClick={onStart} icon="play">开始导入</Primary>
              <Secondary onClick={onReupload} icon="file-plus-2">重新选择文件</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function QuickReplies({ items, onPick }) {
      return (
        <div className="mt-3 flex flex-wrap gap-3">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => onPick(item)}
              className="h-8 px-3 rounded-full border border-[#d8e4f2] bg-white text-sm text-slate-600 hover:border-brand hover:text-brand"
            >
              {item}
            </button>
          ))}
        </div>
      );
    }

    function OtherTextIntentMessage({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:23:12">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              我看了一下，这份内容更像小说 / 故事文本。你希望我接下来怎么处理？
            </div>
            <QuickReplies items={["改成分镜脚本", "先讨论故事方向"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function MediaIntentMessage({ kind, onQuickReply }) {
      const copy = {
        image: "已读取这张参考图。我可以帮你分析角色、场景、风格，或作为后续生成参考。你想先看哪一部分？",
        video: "已收到这段视频。我可以先查看基础信息和画面用途，例如场景氛围、节奏参考或镜头参考方向。",
        audio: "已收到这段音频。我可以先判断它更适合作为配音参考、音乐氛围，还是项目资料。",
        document: "已收到这份资料。我可以先帮你总结内容，或提取其中可用于角色、场景、剧情设定的信息。"
      };
      const replies = {
        image: ["提取角色形象", "分析场景风格", "生成角色形象图", "设置为林燃的角色形象"],
        video: ["查看基础信息", "提取场景参考", "设置为镜头1参考"],
        audio: ["判断音频用途", "提取配音参考", "设置为项目音频资料"],
        document: ["总结资料", "提取角色场景线索"]
      };
      return (
        <AgentMessage time="2026/06/17 14:23:12">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              {copy[kind] || copy.document}
            </div>
            <QuickReplies items={replies[kind] || replies.document} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function ImageUnderstandingResult({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:23:36">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              <div className="font-extrabold text-ink">参考图理解结果</div>
              <div className="mt-1">角色气质：年轻男性，压抑、警觉、带旧案创伤感。</div>
              <div>服装线索：深色外套、微湿发丝、城市夜景反光。</div>
              <div>画面风格：冷色霓虹、低照度、写实悬疑。</div>
              <div>可用方向：角色形象图、海报主视觉、镜头氛围参考。</div>
              <div className="mt-2">我可以继续基于这张图生成临时角色形象图，也可以直接把它设置到项目角色上。</div>
            </div>
            <QuickReplies items={["生成角色形象图", "设置为林燃的角色形象", "提取成提示词"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function SceneUnderstandingResult({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:23:36">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              <div className="font-extrabold text-ink">场景风格分析</div>
              <div className="mt-1">空间：高楼屋顶或玻璃幕墙附近，适合做城市旧案的调查节点。</div>
              <div>光线：低照度、冷蓝主调，人物边缘有霓虹反光。</div>
              <div>镜头建议：中近景压迫感开场，随后推到人物眼神和手部线索。</div>
            </div>
            <QuickReplies items={["生成同风格场景图", "设置为旧案天台场景参考"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function VideoUnderstandingResult({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:23:36">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              <div className="font-extrabold text-ink">视频基础理解</div>
              <div className="mt-1">时长：约 12 秒。</div>
              <div>画面用途：雨夜巷口、追踪、躲避。</div>
              <div>节奏：前半段慢推，后半段急促移动。</div>
              <div>可写回目标：镜头参考、场景参考。</div>
            </div>
            <QuickReplies items={["设置为镜头1参考", "生成同节奏镜头提示词"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function AudioUnderstandingResult({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:23:36">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              <div className="font-extrabold text-ink">音频基础理解</div>
              <div className="mt-1">用途判断：更适合作为低声旁白和悬疑氛围参考。</div>
              <div>情绪关键词：压低、克制、紧张、像在避开他人监听。</div>
              <div>P0 不展示逐字稿和说话人拆分，只做基础用途判断。</div>
            </div>
            <QuickReplies items={["设置为项目音频资料", "生成旁白风格提示词"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function DocumentUnderstandingResult({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:23:36">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              <div className="font-extrabold text-ink">资料文档理解</div>
              <div className="mt-1">关键信息：旧案时间线、嫌疑人证词、现场环境。</div>
              <div>可提取对象：人物线索、场景线索、道具线索。</div>
              <div>建议：先作为项目资料理解，不直接导入为分镜脚本。</div>
            </div>
            <QuickReplies items={["提取角色场景线索", "设置为项目资料"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function MultimodalGenerationCard({ onDone, onPause }) {
      const [tick, setTick] = useState(0);
      const lines = [
        "正在对齐参考图里的冷色低照度和人物气质...",
        "正在生成角色形象图，保持悬疑短剧质感...",
        "正在检查面部一致性、服装细节和背景噪点..."
      ];
      useEffect(() => {
        const timer = setInterval(() => setTick((v) => (v + 1) % lines.length), 2200);
        return () => clearInterval(timer);
      }, []);
      return (
        <AgentMessage time="2026/06/17 14:24:02">
          <Card>
            <CardHeader title="正在生成角色形象图" icon="sparkles" badge="临时生成" />
            <div className="p-5 space-y-3">
              <div className="rounded-xl border border-line bg-[#f8fbff] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-muted">当前进程</div>
                    <div className="mt-1 flex items-center gap-2 font-extrabold"><span className="h-2 w-2 rounded-full bg-blue shadow-[0_0_0_4px_rgba(63,124,255,.12)]"></span>生成临时结果</div>
                  </div>
                  <span className="text-xs font-extrabold text-blue">处理中</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-good to-blue"></div>
                </div>
              </div>
              <div className="h-12 rounded-xl border border-line bg-white px-4 flex items-center gap-3 overflow-hidden">
                <span className="text-xs font-extrabold text-muted shrink-0">流式输出</span>
                <div className="min-w-0 whitespace-nowrap overflow-hidden text-sm text-slate-600 fade-left direction-rtl">
                  <span className="inline-block direction-ltr">{lines[tick]}</span>
                </div>
              </div>
            </div>
            <CardActions>
              <Primary onClick={onDone} icon="check-circle-2">模拟生成完成</Primary>
              <Secondary onClick={onPause} icon="pause">暂停生成</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function GeneratedAssetCard({ onBind, onRegenerate }) {
      return (
        <AgentMessage time="2026/06/17 14:24:48">
          <Card>
            <CardHeader title="临时角色形象图" icon="image" badge="未写入项目" />
            <div className="p-5 grid grid-cols-[220px_1fr] gap-5">
              <div className="h-[300px] rounded-xl overflow-hidden relative bg-[radial-gradient(circle_at_45%_18%,rgba(255,255,255,.85),transparent_12%),linear-gradient(160deg,#111827_0%,#22385f_48%,#7d5cff_100%)]">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute left-6 right-6 bottom-5 text-white">
                  <div className="text-lg font-extrabold">林燃</div>
                  <div className="mt-1 text-xs text-white/75">冷色夜景 · 写实悬疑 · 都市旧案</div>
                </div>
                <div className="absolute left-1/2 top-16 h-24 w-24 -translate-x-1/2 rounded-full bg-slate-200/90 shadow-[0_0_60px_rgba(148,163,184,.65)]"></div>
                <div className="absolute left-1/2 top-36 h-28 w-32 -translate-x-1/2 rounded-t-[44px] bg-slate-900/80"></div>
              </div>
              <div className="text-sm leading-7 text-slate-700">
                <b>生成结果说明</b>
                <p className="mt-2">这是当前对话里的临时生成结果，还没有保存为资产，也没有写入角色。你可以继续调整，或直接设置为项目角色形象。</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Info label="匹配目标" value="林燃 / 男主" />
                  <Info label="用途" value="角色形象图" />
                  <Info label="风格" value="冷色夜景、低照度、写实悬疑" />
                  <Info label="状态" value="临时结果，待确认写回" />
                </div>
              </div>
            </div>
            <CardActions>
              <Primary onClick={onBind} icon="user-check">设置为林燃的角色形象</Primary>
              <Secondary onClick={onRegenerate} icon="refresh-cw">重新生成</Secondary>
              <Secondary icon="download">下载</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function BindingQuestionMessage({ target = "林燃的角色形象", source = "临时角色形象图", onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:25:02">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              {target === "林燃的角色形象"
                ? "「林燃」已有角色形象图。你想覆盖当前形象，还是追加为备用参考？"
                : `我不太确定要把 ${source} 设置到哪里。你想设置为 ${target}，还是换一个目标？`}
            </div>
            <QuickReplies items={["覆盖", "追加为备用参考", "换一个目标", "取消"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function BindingSuccessMessage({ target = "林燃的角色形象" }) {
      return (
        <AgentMessage time="2026/06/17 14:25:18">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-900">
            已设置为「{target}」。后续在项目创作中可以直接引用这个内容。
          </div>
        </AgentMessage>
      );
    }

    function UserMessage({ children }) {
      return (
        <div className="flex justify-end mb-7">
          <div className="max-w-[520px] rounded-2xl bg-[#eef2ff] px-5 py-3 text-[15px] leading-7 text-ink">
            {children}
          </div>
        </div>
      );
    }

    function AdaptConfirmCard({ onStart }) {
      return (
        <AgentMessage time="2026/06/17 14:24:10">
          <Card>
            <CardHeader title="改编确认" icon="wand-sparkles" />
            <div className="p-5 grid grid-cols-2 gap-3">
              <Info label="项目标题" value="雪夜旧案" />
              <Info label="题材" value="悬疑反转 / 都市旧案" />
              <Info label="集数" value="12 集" note="可继续调整" />
              <Info label="字数档" value="中篇（1500-2500字/集）" />
              <Info label="目标平台" value="短视频" />
              <Info label="视觉风格" value="写实悬疑 / 冷色夜景 / 室内低照度" />
              <Info className="col-span-2" label="故事概览" value="围绕雪夜旧案展开短剧化改编，保留悬疑反转基调，将小说叙述压缩成可拍摄的集、片段和镜头。" />
            </div>
            <div className="mx-5 mb-4 rounded-xl border border-line bg-[#f8fbff] p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-muted mb-1">预估消耗</div>
                <div className="font-extrabold">约 260-380 积分</div>
                <div className="text-xs text-muted mt-1 leading-5">改编会基于原文进行创作转换，不是原样导入。开始后可暂停。</div>
              </div>
              <span className="h-8 px-3 rounded-full bg-blue-50 text-blue font-extrabold text-xs flex items-center gap-2"><Icon name="zap" size={14} /> 开始前确认</span>
            </div>
            <CardActions>
              <Primary onClick={onStart} icon="play">开始改编</Primary>
              <Secondary icon="sliders-horizontal">调整目标</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function AdaptDetailsQuestion({ onQuickReply }) {
      return (
        <AgentMessage time="2026/06/17 14:24:10">
          <div>
            <div className="text-[15px] leading-7 text-slate-700">
              可以，我会按改编处理，不会作为原样导入。你想改成多少集、面向什么平台、选择哪个字数档？如果不确定，也可以直接说“你来建议”。
            </div>
            <QuickReplies items={["12集 / 短视频 / 中篇", "你来建议"]} onPick={onQuickReply} />
          </div>
        </AgentMessage>
      );
    }

    function AdaptJobCard({ onPause, onDone }) {
      const [tick, setTick] = useState(0);
      const lines = [
        "正在把原文情节压缩成短剧节奏...",
        "正在补齐可拍摄的镜头动作和对白...",
        "正在拆分每集结尾钩子并写入分镜草稿..."
      ];
      useEffect(() => {
        const timer = setInterval(() => setTick((v) => (v + 1) % lines.length), 2500);
        return () => clearInterval(timer);
      }, []);
      return (
        <AgentMessage time="2026/06/17 14:24:36">
          <Card>
            <CardHeader title="正在改编为分镜脚本" icon="activity" badge="Agent 工作中" />
            <div className="p-5 space-y-3">
              <div className="rounded-xl border border-line bg-[#f8fbff] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-muted">当前进程</div>
                    <div className="mt-1 flex items-center gap-2 font-extrabold"><span className="h-2 w-2 rounded-full bg-blue shadow-[0_0_0_4px_rgba(63,124,255,.12)]"></span>生成分镜草稿</div>
                  </div>
                  <span className="text-xs font-extrabold text-blue">处理中</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-good to-blue"></div>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-[#f8fbff] p-4">
                <div className="text-xs font-bold text-muted">完成情况</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">已完成故事拆解，正在生成第 1 集分镜；当前已生成 <b>3 / 12</b> 集草稿，形成 <b>48</b> 条分镜。</div>
              </div>
              <div className="h-12 rounded-xl border border-line bg-white px-4 flex items-center gap-3 overflow-hidden">
                <span className="text-xs font-extrabold text-muted shrink-0">流式输出</span>
                <div className="min-w-0 whitespace-nowrap overflow-hidden text-sm text-slate-600 fade-left direction-rtl">
                  <span className="inline-block direction-ltr">{lines[tick]}</span>
                </div>
              </div>
            </div>
            <CardActions>
              <Primary onClick={onPause} icon="pause">暂停改编</Primary>
              <Secondary onClick={onDone} icon="check-circle-2">模拟完成</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function AdaptCompleteCard({ onOpenTable }) {
      return (
        <AgentMessage time="2026/06/17 14:28:02">
          <Card>
            <CardHeader title="改编完成" icon="check-check" badge="已生成分镜" />
            <div className="px-5 py-4 text-sm leading-7 text-slate-700">
              改编完成：已生成 12 集、36 个片段、138 条分镜，并提取 8 个人物、15 个场景、24 个道具。你可以进入分镜工作台继续编辑。
            </div>
            <CardActions>
              <Primary onClick={onOpenTable} icon="panel-top">打开分镜工作台</Primary>
              <Secondary icon="users">查看人物 / 场景 / 道具</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function ImportJobCard({ onPause, onFail, onDone }) {
      const [tick, setTick] = useState(0);
      const lines = [
        "正在识别镜号、画面描述和对白边界，正在把连续段落拆成可编辑片段...",
        "正在整理人物名称和首次出现位置，并同步提取场景与关键道具...",
        "正在写入分镜表，世界观和正文将作为兼容内容反向生成..."
      ];
      useEffect(() => {
        const timer = setInterval(() => setTick((v) => (v + 1) % lines.length), 2500);
        return () => clearInterval(timer);
      }, []);
      return (
        <AgentMessage time="2026/06/17 14:23:19">
          <Card>
            <CardHeader title="正在导入剧本结构" icon="activity" badge="Agent 工作中" />
            <div className="p-5 space-y-3">
              <div className="rounded-xl border border-line bg-[#f8fbff] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-muted">当前进程</div>
                    <div className="mt-1 flex items-center gap-2 font-extrabold"><span className="h-2 w-2 rounded-full bg-blue shadow-[0_0_0_4px_rgba(63,124,255,.12)]"></span>结构化分镜</div>
                  </div>
                  <span className="text-xs font-extrabold text-blue">处理中</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-good to-blue"></div>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-[#f8fbff] p-4">
                <div className="text-xs font-bold text-muted">完成情况</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">已读取全文，完成片段拆分；当前已形成 <b>86</b> 条分镜、<b>23</b> 个片段，并识别 <b>8</b> 个人物、<b>12</b> 个场景、<b>17</b> 个道具。</div>
              </div>
              <div className="h-12 rounded-xl border border-line bg-white px-4 flex items-center gap-3 overflow-hidden">
                <span className="text-xs font-extrabold text-muted shrink-0">流式输出</span>
                <div className="min-w-0 whitespace-nowrap overflow-hidden text-sm text-slate-600 fade-left direction-rtl">
                  <span className="inline-block direction-ltr">{lines[tick]}</span>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-slate-600">
                分镜严格按原始脚本结构化；世界观、正文和大纲可作为兼容内容反向生成，但不会反向改写已导入分镜。
              </div>
            </div>
            <CardActions>
              <Primary onClick={onPause} icon="pause">暂停导入</Primary>
              <Secondary onClick={onDone} icon="check-circle-2">模拟完成</Secondary>
              <Secondary onClick={onFail} icon="triangle-alert">模拟失败</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function PauseCard({ onResume }) {
      return (
        <AgentMessage time="2026/06/17 14:24:06">
          <Card>
            <CardHeader title="导入已暂停" icon="pause-circle" badge="可继续" />
            <div className="px-5 py-4 text-sm leading-7 text-slate-700">
              已暂停在 <b>结构化分镜</b>。当前已保留 23 个片段和 86 条分镜草稿；暂停后不会继续消耗积分，继续导入会从当前进程恢复。
            </div>
            <CardActions>
              <Primary onClick={onResume} icon="play">继续导入</Primary>
              <Secondary icon="table-2">查看已导入内容</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function ErrorCard({ onRetry, onReupload }) {
      return (
        <AgentMessage time="2026/06/17 14:24:38">
          <Card>
            <CardHeader title="导入中断" icon="circle-alert" badge="可重试" danger />
            <div className="px-5 py-4 text-sm leading-7 text-slate-700">
              结构化分镜时出现异常，已保留已写入的片段和分镜。你可以重试当前进程；如果再次失败，可以先查看已导入内容或重新上传文本。
            </div>
            <CardActions>
              <Primary onClick={onRetry} icon="refresh-cw">重试当前进程</Primary>
              <Secondary icon="table-2">查看已导入内容</Secondary>
              <Secondary onClick={onReupload} icon="file-plus-2">重新选择文件</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function CompleteCard({ onOpenTable }) {
      return (
        <AgentMessage time="2026/06/17 14:26:02">
          <Card>
            <CardHeader title="导入完成" icon="check-check" badge="已写入项目" />
            <div className="px-5 py-4 text-sm leading-7 text-slate-700">
              已完成导入：创建 1 个未分集、23 个片段、86 条分镜，提取 8 个人物、12 个场景、17 个道具。未识别到明确分集结构，已先按“未分集 / 第 1 集”导入，该节点仅作为结构容器。世界观和正文已作为辅助内容生成，不会反向影响分镜。
            </div>
            <CardActions>
              <Primary onClick={onOpenTable} icon="panel-top">打开分镜工作台</Primary>
              <Secondary icon="users">查看人物 / 场景 / 道具</Secondary>
            </CardActions>
          </Card>
        </AgentMessage>
      );
    }

    function AgentMessage({ time, children }) {
      return (
        <div className="grid grid-cols-[38px_minmax(0,760px)] gap-4 mb-7">
          <div className="brand-mark h-9 w-9 rounded-full grid place-items-center text-white font-black">S</div>
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2"><b className="text-ink text-sm">塑梦</b>{time}</div>
            {children}
          </div>
        </div>
      );
    }

    function Card({ children }) {
      return <div className="rounded-xl border border-line bg-white shadow-soft overflow-hidden">{children}</div>;
    }

    function CardHeader({ title, icon, badge, danger }) {
      return (
        <div className="h-16 px-5 border-b border-line flex items-center justify-between">
          <h3 className="font-extrabold text-lg flex items-center gap-2"><Icon name={icon} size={20} /> {title}</h3>
          {badge && (
            <span className={`h-8 px-3 rounded-full text-xs font-extrabold flex items-center gap-2 ${danger ? "bg-rose-50 text-danger" : "bg-blue-50 text-blue"}`}>
              <Icon name={danger ? "refresh-cw" : "check-circle-2"} size={14} /> {badge}
            </span>
          )}
        </div>
      );
    }

    function Info({ label, value, note, className = "" }) {
      return (
        <div className={`rounded-lg border border-[#edf2f8] bg-[#f7f9fc] p-4 min-h-[74px] ${className}`}>
          <div className="text-xs text-slate-400 mb-2">{label}</div>
          <div className="font-extrabold leading-6">{value}</div>
          {note && <div className="mt-1 text-xs text-muted">{note}</div>}
        </div>
      );
    }

    function CardActions({ children }) {
      return <div className="px-5 pb-5 flex flex-wrap items-center gap-3">{children}</div>;
    }

    function Primary({ children, icon, onClick }) {
      return <button onClick={onClick} className="h-10 px-5 rounded-full bg-navy text-white font-extrabold flex items-center gap-2"><Icon name={icon} size={17} /> {children}</button>;
    }

    function Secondary({ children, icon, onClick }) {
      return <button onClick={onClick} className="h-10 px-4 rounded-full bg-white border border-line text-slate-700 font-bold flex items-center gap-2 hover:bg-slate-50"><Icon name={icon} size={17} /> {children}</button>;
    }

    function RightPanel({ status }) {
      const isMultimodal = ["mediaText", "imageUnderstanding", "sceneUnderstanding", "videoUnderstanding", "audioUnderstanding", "documentUnderstanding", "mediaGenerating", "generatedAsset", "bindConfirm", "bindSuccess"].includes(status);
      return (
        <aside className="min-w-0 border-l border-line bg-[#f7f9fd] px-5 py-7 overflow-y-auto scrollbar-thin">
          <div className="h-10 rounded-xl bg-slate-100 p-1 grid grid-cols-3 gap-1 mb-5">
            {["内容", "概述", "队列"].map((tab, index) => <button key={tab} className={`rounded-lg font-bold text-sm ${index === 1 ? "bg-white shadow-soft" : "text-slate-500"}`}>{tab}</button>)}
          </div>
          <SideCard title="项目设定">
            <SummaryRow label="题材" value="悬疑反转" />
            <SummaryRow label="集数" value="规则识别 12 集" />
            <SummaryRow label="视觉风格" value="冷色夜景" />
            <SummaryRow label="目标平台" value="短视频" />
          </SideCard>
          <SideCard title="导入结构">
            {["未分集 / 第 1 集", "片段 01：深夜林地", "片段 02：旧警局", "片段 03：审讯室"].map((item, i) => (
              <div key={item} className="min-h-9 rounded-lg bg-slate-50 px-3 py-2 mb-2 text-sm flex justify-between gap-3">
                <span>{item}</span><b>{i === 0 ? "86 镜" : `${[9,14,11][i-1]} 镜`}</b>
              </div>
            ))}
          </SideCard>
          {isMultimodal && (
            <SideCard title="多模态状态">
              <SummaryRow label="当前素材" value={status === "generatedAsset" || status === "bindConfirm" || status === "bindSuccess" ? "临时角色形象图" : "对话附件"} />
              <SummaryRow label="理解结果" value={["imageUnderstanding", "sceneUnderstanding", "videoUnderstanding", "audioUnderstanding", "documentUnderstanding"].includes(status) ? "已输出" : "待确认"} />
              <SummaryRow label="生成结果" value={status === "generatedAsset" || status === "bindConfirm" || status === "bindSuccess" ? "已生成" : "未生成"} />
              <SummaryRow label="写回状态" value={status === "bindSuccess" ? "已绑定" : status === "bindConfirm" ? "待确认" : "未写入"} />
              <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs leading-5 text-blue">素材不会自动进资产库；当用户明确设置目标后，才写入角色、场景、镜头或项目资料。</div>
            </SideCard>
          )}
          <SideCard title="兼容说明">
            <p className="text-sm leading-6 text-slate-600">分镜严格按用户原始脚本结构化；世界观、正文和大纲可作为兼容内容反向生成，但不会反向改写已导入分镜。</p>
          </SideCard>
        </aside>
      );
    }

    function SideCard({ title, children }) {
      return <section className="rounded-xl border border-[#e4ebf5] bg-white p-4 mb-4"><h4 className="text-sm font-extrabold text-slate-500 mb-3">{title}</h4>{children}</section>;
    }

    function SummaryRow({ label, value }) {
      return <div className="min-h-8 flex items-center justify-between gap-4 text-sm"><span className="text-slate-500">{label}</span><b>{value}</b></div>;
    }

    function ChatComposer({ onSubmit }) {
      const [text, setText] = useState("");
      const [attachment, setAttachment] = useState(null);
      const inputRef = useRef(null);
      const submit = () => {
        const value = text.trim();
        if (!value && !attachment) return;
        onSubmit?.(value, attachment);
        setText("");
        setAttachment(null);
      };
      const pickFile = (event) => {
        const file = event.target.files?.[0];
        if (file) setAttachment(attachmentFromFile(file));
        event.target.value = "";
      };
      return (
        <div className="mx-auto mb-5 w-[min(900px,calc(100%-64px))] rounded-3xl border border-[#d8e4f2] bg-white shadow-soft overflow-hidden">
          <input ref={inputRef} type="file" className="hidden" onChange={pickFile} accept=".md,.txt,.doc,.docx,.pdf,.png,.jpg,.jpeg,.webp,.mp4,.mov,.webm,.mp3,.wav,.m4a" />
          {attachment && (
            <div className="px-5 pt-4">
              <AttachmentChip attachment={attachment} onRemove={() => setAttachment(null)} />
            </div>
          )}
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-16 w-full resize-none outline-none px-5 pt-4 text-sm"
            placeholder={attachment ? "补充一句指令，或直接发送文件。" : "继续和 Agent 讨论这个项目。"}
          ></textarea>
          <div className="h-12 px-5 flex items-center gap-4">
            <button onClick={() => inputRef.current?.click()} className="h-10 w-10 rounded-full border border-line grid place-items-center text-slate-600"><Icon name="plus" /></button>
            <button className="text-sm flex items-center gap-2 text-slate-700"><Icon name="sparkles" size={17} />Agent 模式</button>
            <button className="text-sm flex items-center gap-2 text-slate-700"><Icon name="sliders-horizontal" size={17} />模型偏好 <Icon name="chevron-down" size={14} /></button>
            <button className="text-sm flex items-center gap-2 text-slate-700"><Icon name="rectangle-horizontal" size={17} />16:9 <Icon name="chevron-down" size={14} /></button>
            <button onClick={submit} className={`ml-auto h-10 w-10 rounded-full grid place-items-center ${text.trim() || attachment ? "bg-navy text-white" : "bg-slate-100 text-slate-400"}`}><Icon name="arrow-up" /></button>
          </div>
        </div>
      );
    }

    function ChatView({ onOpenTable, onReupload, initialKind, initialAttachment }) {
      const mediaKinds = ["image", "video", "audio", "document"];
      const phaseForKind = (kind) => kind === "other" ? "otherText" : (mediaKinds.includes(kind) ? "mediaText" : "initial");
      const seedAttachment = initialAttachment || sampleAttachments[initialKind] || sampleAttachments.script;
      const [phase, setPhase] = useState(phaseForKind(initialKind));
      const [activeKind, setActiveKind] = useState(initialKind);
      const [bindTarget, setBindTarget] = useState("林燃的角色形象");
      const [bindSource, setBindSource] = useState("临时角色形象图");
      const [userReplies, setUserReplies] = useState([]);
      const hasAdaptDetails = (value) => /(集|字数|短视频|平台|短篇|中篇|长篇|你来建议|建议)/.test(value);
      const requestBind = (value, options = {}) => {
        if (/镜头1|镜头/.test(value)) {
          setBindTarget("第 1 集镜头 1 的参考视频");
          setBindSource("雨夜巷口_参考视频.mp4");
        } else if (/音频|旁白/.test(value)) {
          setBindTarget("项目音频资料");
          setBindSource("低声旁白_情绪参考.wav");
        } else if (/场景/.test(value)) {
          setBindTarget("旧案天台场景参考");
          setBindSource("屋顶夜景_参考图.png");
        } else if (/资料/.test(value)) {
          setBindTarget("项目资料");
          setBindSource("旧案背景资料.pdf");
        } else {
          setBindTarget("林燃的角色形象");
          setBindSource(phase === "generatedAsset" ? "临时角色形象图" : "屋顶夜景_参考图.png");
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
      return (
        <div className="h-full grid grid-cols-[minmax(0,1fr)_minmax(300px,360px)] overflow-hidden">
          <main className="min-h-0 grid grid-rows-[minmax(0,1fr)_auto] bg-white">
            <div className="overflow-y-auto scrollbar-thin px-16 py-10">
              <div className="max-w-[880px] mx-auto">
                <FileUserMessage attachment={seedAttachment} text={initialKind === "script" ? "帮我导入这个分镜脚本" : ""} />
                <AgentMessage time="2026/06/17 14:23:08">
                  <div className="text-[15px] leading-7 text-slate-700">已收到 @{seedAttachment.name}。我先读取必要片段，做一次初步理解。</div>
                </AgentMessage>
                {phase === "initial" && <InitialCard onStart={() => setPhase("running")} onReupload={onReupload} />}
                {phase === "otherText" && <OtherTextIntentMessage onQuickReply={handleSubmit} />}
                {phase === "mediaText" && <MediaIntentMessage kind={activeKind} onQuickReply={handleSubmit} />}
                {userReplies.map((reply, index) => (
                  <React.Fragment key={`${reply.text || reply.attachment?.name}-${index}`}>
                    {reply.attachment ? (
                      <>
                        <FileUserMessage attachment={reply.attachment} text={reply.text} />
                        <AgentMessage time="2026/06/17 14:23:08">
                          <div className="text-[15px] leading-7 text-slate-700">已收到 @{reply.attachment.name}。我先读取必要片段，做一次初步理解。</div>
                        </AgentMessage>
                      </>
                    ) : (
                      <UserMessage>{reply.text}</UserMessage>
                    )}
                  </React.Fragment>
                ))}
                {phase === "adaptAskDetails" && <AdaptDetailsQuestion onQuickReply={handleSubmit} />}
                {phase === "adaptConfirm" && <AdaptConfirmCard onStart={() => setPhase("adaptRunning")} />}
                {phase === "adaptRunning" && <AdaptJobCard onPause={() => setPhase("adaptPaused")} onDone={() => setPhase("adaptComplete")} />}
                {phase === "adaptPaused" && <PauseCard onResume={() => setPhase("adaptRunning")} />}
                {phase === "adaptComplete" && <AdaptCompleteCard onOpenTable={onOpenTable} />}
                {phase === "imageUnderstanding" && <ImageUnderstandingResult onQuickReply={handleSubmit} />}
                {phase === "sceneUnderstanding" && <SceneUnderstandingResult onQuickReply={handleSubmit} />}
                {phase === "videoUnderstanding" && <VideoUnderstandingResult onQuickReply={handleSubmit} />}
                {phase === "audioUnderstanding" && <AudioUnderstandingResult onQuickReply={handleSubmit} />}
                {phase === "documentUnderstanding" && <DocumentUnderstandingResult onQuickReply={handleSubmit} />}
                {phase === "mediaGenerating" && <MultimodalGenerationCard onPause={() => setPhase("mediaText")} onDone={() => setPhase("generatedAsset")} />}
                {phase === "generatedAsset" && <GeneratedAssetCard onRegenerate={() => setPhase("mediaGenerating")} onBind={() => requestBind("设置为林燃的角色形象")} />}
                {phase === "bindConfirm" && <BindingQuestionMessage target={bindTarget} source={bindSource} onQuickReply={handleSubmit} />}
                {phase === "bindSuccess" && <BindingSuccessMessage target={bindTarget} />}
                {phase === "running" && <ImportJobCard onPause={() => setPhase("paused")} onFail={() => setPhase("error")} onDone={() => setPhase("complete")} />}
                {phase === "paused" && <PauseCard onResume={() => setPhase("running")} />}
                {phase === "error" && <ErrorCard onRetry={() => setPhase("running")} onReupload={onReupload} />}
                {phase === "complete" && <CompleteCard onOpenTable={onOpenTable} />}
              </div>
            </div>
            <ChatComposer onSubmit={handleSubmit} />
          </main>
          <RightPanel status={phase} />
        </div>
      );
    }

    function StoryboardView({ onBack }) {
      const shots = [
        {
          title: "镜头1",
          time: "12s",
          scene: "汽修厂后巷阁楼",
          people: "林燃",
          text: [
            "【固定锚点】：阁楼窗前。林燃背对镜头，指尖紧捏一枚锈蚀铜铃，身体重心因紧张而僵硬。",
            "0秒-4秒：全景 + 平视 + 固定位，窗外密云光透过破瓦缝隙，画面边缘有轻微弱的现实裂痕。",
            "4秒-8秒：近景 + 低机位 + 慢推，林燃下颌沁汗，纸页边缘因受潮卷起。",
            "8秒-12秒：特写 + 俯拍，手机壁虎、铜铃和尘埃一同入画，听见远处脚步声。"
          ],
          dialogue: "—"
        },
        {
          title: "镜头2",
          time: "13s",
          scene: "汽修厂后巷阁楼",
          people: "林燃",
          text: [
            "【固定锚点】：门缝处的逆光。林燃把铜铃收进袖口，背后传来钥匙轻响。",
            "0秒-6秒：中景 + 手持，镜头跟随他退到墙边，焦点在门锁和他的呼吸之间切换。",
            "6秒-13秒：特写 + 快切，灯泡闪烁两次，门外人影停住。"
          ],
          dialogue: "林燃低声：别响。"
        }
      ];

      return (
        <div className="h-full bg-white grid grid-rows-[58px_48px_minmax(0,1fr)_124px] overflow-hidden">
          <header className="border-b border-line px-6 flex items-center gap-4">
            <div className="h-7 w-7 rounded-full bg-[#eef0ff] text-brand grid place-items-center"><Icon name="grid-2x2" size={15} /></div>
            <div className="font-extrabold">第1集 · 铃响三秒</div>
            <button className="h-8 px-4 rounded-full border border-line bg-white text-sm font-bold flex items-center gap-2">v1（当前）<Icon name="chevron-down" size={14} /></button>
            <div className="ml-auto flex items-center gap-6 text-sm text-slate-600">
              <button className="flex items-center gap-1">16:9 <Icon name="chevron-down" size={14} /></button>
              <button className="flex items-center gap-1">1080P <Icon name="chevron-down" size={14} /></button>
              <button className="flex items-center gap-1">无字幕 <Icon name="chevron-down" size={14} /></button>
              <button className="flex items-center gap-1">分镜故事板模式 <Icon name="chevron-down" size={14} /></button>
              <button className="font-bold text-ink flex items-center gap-1">导出 <Icon name="chevron-down" size={14} /></button>
              <button className="h-8 px-4 rounded-full border border-line bg-white text-slate-600 font-bold">重新规划分镜 <span className="text-brand">0.11</span></button>
              <button onClick={onBack} className="h-9 w-9 rounded-full bg-slate-100 text-slate-500 grid place-items-center"><Icon name="x" size={18} /></button>
            </div>
          </header>

          <nav className="px-5 flex items-center gap-7 border-b border-[#eef2fb] text-sm">
            {[["片段一 · 2个", true], ["片段二 · 3个", false], ["片段三 · 4个", false]].map(([label, active]) => (
              <button key={label} className={`flex items-center gap-2 font-bold ${active ? "text-ink" : "text-[#9aacbf]"}`}>
                <span className={`h-3.5 w-3.5 rounded-full border-4 ${active ? "border-brand" : "border-[#e6edf7]"}`}></span>{label}
              </button>
            ))}
          </nav>

          <main className="min-h-0 bg-[#f7f8ff] p-4 overflow-y-auto scrollbar-thin">
            <section className="rounded-2xl border border-[#e4e8fb] bg-white shadow-soft overflow-hidden">
              <div className="h-[60px] bg-[#f0edff] px-5 flex items-center gap-3">
                <b className="text-sm">维度崩塌</b>
                <span className="text-sm text-slate-500">核心场景：</span>
                <Pill icon="map-pin" text="汽修厂后巷阁楼、虚无缝隙空间" />
                <button className="h-8 px-3 rounded-full border border-[#d8e3f1] bg-white text-sm text-slate-600 flex items-center gap-1">出场角色 <Icon name="chevron-down" size={14} /></button>
                <div className="ml-auto flex gap-3">
                  <button className="h-10 px-5 rounded-full bg-brand text-white font-extrabold">生成分镜故事板</button>
                  <button className="h-10 px-5 rounded-full bg-brand text-white font-extrabold">生成片段视频</button>
                </div>
              </div>

              <div className="p-4 space-y-5">
                {shots.map((shot, index) => (
                  <div key={shot.title}>
                    <div className="grid grid-cols-[42%_16%_1fr] gap-3">
                      <ShotCard shot={shot} />
                      <MediaPlaceholder label="暂无故事板图" />
                      <MediaPlaceholder label="暂无分镜视频" wide />
                    </div>
                    {index === 0 && <div className="h-8 flex items-center justify-center text-xs text-[#b0bfd0]">此处可新增分镜</div>}
                  </div>
                ))}
              </div>
            </section>
          </main>

          <footer className="border-t border-line bg-white grid grid-cols-[minmax(0,1fr)_112px] overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin px-6 py-3 flex items-center gap-3">
              <TimelineMarker label="片段一" />
              {["镜头1 · 阁楼暴雨手机", "镜头2 · 铜铃震颤坠入", "镜头1 · 维度睁眼与低语", "镜头2 · 凝固的扶手时刻", "镜头3 · 修正规避与落地", "镜头1 · 现实重启与铁柜...", "镜头2 · 陈默现身与递扳手", "镜头3 · 铜铃裂痕与领命...", "镜头4 · 工牌异动与案忌..."].map((label, index) => (
                <TimelineCard key={label} label={label} active={index === 0} time={["00:12", "00:13", "00:07", "00:09", "00:12", "00:10", "00:15", "00:12", "00:10"][index]} />
              ))}
            </div>
            <div className="border-l border-line flex flex-col items-center justify-center gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-2"><Icon name="play" size={14} /> 01:40</div>
              <button className="h-9 px-4 rounded-full bg-[#8a6af5] text-white font-extrabold text-sm">合成本集</button>
            </div>
          </footer>
        </div>
      );
    }

    function Pill({ icon, text }) {
      return <span className="h-8 px-3 rounded-full border border-[#d8e3f1] bg-white text-xs text-slate-600 flex items-center gap-2"><Icon name={icon} size={13} />{text}</span>;
    }

    function ShotCard({ shot }) {
      return (
        <article className="min-h-[316px] rounded-xl border border-[#d8e3f1] bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold">{shot.title}</h3>
            <div className="flex gap-3 text-[#7d92ad]"><Icon name="pencil" size={16} /><Icon name="trash-2" size={16} /></div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#7890ad] mb-5">
            <span>时长：<b className="text-slate-700">{shot.time}</b></span>
            <span>场景：<Pill icon="map-pin" text={shot.scene} /></span>
            <span>人物：<Pill icon="user-round" text={shot.people} /></span>
          </div>
          <div className="text-sm text-[#8ca1bb] mb-2">画面描述</div>
          <div className="space-y-2 text-sm leading-7 text-slate-700">
            {shot.text.map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="mt-5 text-sm text-[#8ca1bb]">对白/旁白：<span className="text-slate-500">{shot.dialogue}</span></div>
        </article>
      );
    }

    function MediaPlaceholder({ label, wide }) {
      return (
        <div className={`relative min-h-[316px] rounded-xl bg-[#eef3f9] grid place-items-center text-[#8ea1b8] ${wide ? "" : ""}`}>
          <button className="absolute right-3 top-3 h-6 w-6 rounded-full bg-slate-400/70 text-white grid place-items-center"><Icon name="refresh-cw" size={14} /></button>
          <div className="text-center text-xs"><Icon name="film" size={24} className="mx-auto mb-2 opacity-60" />{label}</div>
        </div>
      );
    }

    function TimelineMarker({ label }) {
      return <div className="h-20 w-7 shrink-0 border-x border-[#d8e3f1] text-xs text-[#8ea1b8] flex items-center justify-center [writing-mode:vertical-rl]">{label}</div>;
    }

    function TimelineCard({ label, time, active }) {
      return (
        <button className={`h-[78px] w-[140px] shrink-0 rounded-lg text-left ${active ? "border-2 border-brand bg-white" : "border border-transparent bg-[#edf2f8]"}`}>
          <div className="h-14 grid place-items-center text-[#a7b6c8]"><Icon name="film" size={22} /></div>
          <div className="px-2 pb-2 flex items-center gap-2">
            <span className="rounded bg-slate-500 px-1.5 py-0.5 text-[10px] text-white font-bold">{time}</span>
            <span className="text-xs text-slate-600 truncate">{label}</span>
          </div>
        </button>
      );
    }

    function AssetGroup({ title, items }) {
      return <div className="mb-4"><div className="text-xs font-extrabold text-muted mb-2">{title}</div><div className="flex flex-wrap gap-2">{items.map((it) => <span key={it} className="h-7 px-3 rounded-full bg-slate-100 text-xs flex items-center">{it}</span>)}</div></div>;
    }

    function Home({ onSendAttachment }) {
      const [text, setText] = useState("");
      const [attachment, setAttachment] = useState(null);
      const inputRef = useRef(null);
      const pickFile = (event) => {
        const file = event.target.files?.[0];
        if (file) setAttachment(attachmentFromFile(file));
        event.target.value = "";
      };
      const submit = () => {
        if (!text.trim() && !attachment) return;
        onSendAttachment?.(attachment || sampleAttachments.script, text.trim());
        setText("");
        setAttachment(null);
      };
      return (
        <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_62%_18%,rgba(114,92,255,.10),transparent_30%),linear-gradient(180deg,#fff_0%,#f7fbff_100%)] px-14 py-12">
          <div className="max-w-[920px] mx-auto text-center">
            <div className="brand-mark h-11 w-11 mx-auto rounded-2xl grid place-items-center text-white font-black text-xl">S</div>
            <h1 className="mt-6 text-3xl font-extrabold">大魔术师（正式版），欢迎来到塑梦AI</h1>
            <p className="mt-3 text-muted">AI 驱动的短剧创作工厂。从灵感到成片，通过对话完成全流程。</p>
            <div className="mt-8 mx-auto w-[850px] rounded-3xl border border-[#d8e4f2] bg-white shadow-soft overflow-hidden text-left">
              <input ref={inputRef} type="file" className="hidden" onChange={pickFile} accept=".md,.txt,.doc,.docx,.pdf,.png,.jpg,.jpeg,.webp,.mp4,.mov,.webm,.mp3,.wav,.m4a" />
              {attachment && (
                <div className="px-6 pt-5">
                  <AttachmentChip attachment={attachment} onRemove={() => setAttachment(null)} />
                </div>
              )}
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="h-36 w-full resize-none outline-none p-6"
                placeholder={attachment ? "补充一句指令，或直接发送文件。" : "描述想法，从这里为你塑梦。"}
              ></textarea>
              <div className="h-14 px-5 flex items-center gap-4">
                <button onClick={() => inputRef.current?.click()} className="h-10 w-10 rounded-full border border-line grid place-items-center"><Icon name="plus" /></button>
                <button className="text-sm flex items-center gap-2"><Icon name="sparkles" size={17} />Agent 模式</button>
                <button className="text-sm flex items-center gap-2"><Icon name="sliders-horizontal" size={17} />模型偏好 <Icon name="chevron-down" size={14} /></button>
                <button className="text-sm flex items-center gap-2"><Icon name="rectangle-horizontal" size={17} />16:9 <Icon name="chevron-down" size={14} /></button>
                <button onClick={submit} className={`ml-auto h-10 w-10 rounded-full grid place-items-center ${text.trim() || attachment ? "bg-navy text-white" : "bg-slate-100 text-slate-400"}`}><Icon name="arrow-up" /></button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="text-muted">原型演示文件</span>
              {[
                ["分镜脚本", sampleAttachments.script],
                ["小说文本", sampleAttachments.other],
                ["参考图", sampleAttachments.image],
                ["参考视频", sampleAttachments.video],
                ["音频参考", sampleAttachments.audio],
                ["资料文档", sampleAttachments.document]
              ].map(([label, file]) => (
                <button key={label} onClick={() => setAttachment(file)} className="h-9 px-4 rounded-full border border-line bg-white shadow-soft text-slate-600 inline-flex items-center gap-2"><Icon name={file.icon} size={15} />{label}</button>
              ))}
            </div>
          </div>
        </div>
      );
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
        return <StoryboardView onBack={() => setScreen("chat")} />;
      }
      return (
        <div className="h-full min-w-[1180px] flex">
          <Sidebar />
          <section className="min-w-0 flex-1 grid grid-rows-[56px_1fr]">
            <Topbar mode="chat" />
            {screen === "home" && <Home onSendAttachment={(attachment) => handoff(attachment)} />}
            {screen === "chat" && <ChatView initialKind={importKind} initialAttachment={activeAttachment} onOpenTable={() => setScreen("table")} onReupload={() => setScreen("home")} />}
          </section>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
