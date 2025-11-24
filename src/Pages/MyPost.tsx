

export default function MyPost() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
      <h2 className="text-2xl font-semibold text-slate-800">My Posts</h2>
      <p className="text-sm text-slate-500 mt-2">A quick overview of posts created by you.</p>
      <div className="mt-6">
        <div className="inline-flex items-center justify-center w-40 h-40 bg-slate-100 rounded-md text-slate-400">No posts yet</div>
      </div>
    </div>
  )
}
