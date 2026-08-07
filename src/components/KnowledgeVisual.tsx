export function KnowledgeVisual() {
  return <div className="knowledge-visual" role="img" aria-label="AI knowledge platform: retrieval pipeline from an Obsidian vault through chunking, embeddings, retrieval, an LLM backend and response generation to a developer, converging with a git post-commit capture loop back into the knowledge base">
    <div className="eng-grid" />
    <p className="kn-title">KNOWLEDGE / RAG + DOCS LOOP</p>
    <p className="kn-status">SYNC LOOP <b>LIVE</b></p>
    <div className="eng-node kn-vault"><small>OBSIDIAN</small><b>VAULT</b><em>MARKDOWN NOTES</em></div>
    <div className="eng-node kn-loader"><small>STAGE</small><b>DOC LOADER</b></div>
    <div className="eng-node kn-chunk"><small>STAGE</small><b>CHUNKING</b></div>
    <div className="eng-node kn-embed hot"><small>INDEX</small><b>EMBEDDINGS</b><em>VECTOR INDEX</em></div>
    <div className="eng-node kn-retr"><small>QUERY</small><b>RETRIEVER</b></div>
    <div className="eng-node kn-groq"><small>INFERENCE</small><b>GROQ API</b></div>
    <div className="eng-node kn-resp"><small>OUTPUT</small><b>RESPONSE GEN</b></div>
    <div className="eng-node kn-dev"><small>CONSUMER</small><b>DEVELOPER</b></div>
    <div className="eng-node kn-git"><small>SOURCE</small><b>GIT REPO</b><em>COMMITS</em></div>
    <div className="eng-node kn-watch"><small>HOOK</small><b>COMMIT WATCHER</b></div>
    <div className="eng-node kn-docs"><small>GEN</small><b>COMMIT NOTES</b></div>
    <div className="eng-node kn-kb"><small>TARGET</small><b>OBSIDIAN KB</b></div>
    <div className="kn-converge"><span>CONTINUOUS</span><b>EVOLVING KNOWLEDGE</b></div>
    <div className="eng-rail kn-rail-1"><b /></div>
    <div className="eng-rail kn-rail-2"><b /></div>
    <div className="eng-rail kn-rail-3"><b /></div>
    <div className="eng-rail kn-rail-4"><b /></div>
    <div className="eng-rail kn-rail-5"><b /></div>
    <div className="eng-rail kn-rail-6"><b /></div>
    <div className="eng-rail kn-rail-7"><b /></div>
    <div className="eng-rail kn-rail-8"><b /></div>
    <div className="eng-rail kn-rail-9"><b /></div>
    <div className="eng-rail kn-rail-10"><b /></div>
    <div className="eng-rail kn-rail-11"><b /></div>
    <div className="kn-loop"><b /></div>
    <em className="kn-loop-label">SYNC / LOOP</em>
    <em className="kn-cue cue-query">? QUERY</em>
  </div>
}
