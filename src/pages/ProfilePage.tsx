import PageShell from '../components/Layout/PageShell'

const identityTags = ['写作', '开发', '记录', '生长']

const contactItems = [
  { label: '邮箱', value: '（待补充）', hint: '用于工作联系或合作邀约' },
  { label: '社交账号', value: '（待补充）', hint: '可替换为你的常用平台主页' },
  { label: '所在地', value: '（待补充）', hint: '如果你愿意公开，可以写城市或时区' },
]

export default function ProfilePage() {
  return (
    <PageShell title="个人介绍" subtitle="这里放我的自我介绍、工作方向、标签和联系方式。">
      <div className="grid gap-6 md:grid-cols-[1.4fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-2xl">
          <h2 className="text-lg font-semibold text-white">我是谁</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            这里是个人介绍的正式页面。当前仓库里没有可直接使用的自我介绍原文，
            所以先保留为可替换占位内容。后续可以补充你的职业方向、擅长领域、近期关注主题，
            以及这座数字花园想传达的整体气质。
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              标签
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {identityTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/12 px-3 py-1 text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/14 bg-white/6 p-4">
            <p className="text-sm font-medium text-white">可替换提示</p>
            <p className="mt-2 text-sm leading-7 text-white/62">
              把这里替换成你的真实简介、现在在做什么、希望别人如何理解你。
              如果以后有更完整的“关于我”内容，可以直接替换整段正文而不影响版式。
            </p>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur-2xl">
          <h2 className="text-lg font-semibold text-white">联系我</h2>
          <ul className="mt-4 space-y-4">
            {contactItems.map((item) => (
              <li key={item.label} className="rounded-[1.25rem] border border-white/12 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">{item.label}</p>
                <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
                <p className="mt-2 text-xs leading-6 text-white/55">{item.hint}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PageShell>
  )
}
