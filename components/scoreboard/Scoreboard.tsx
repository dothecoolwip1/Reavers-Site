export function Scoreboard() {
  return (
    <div className="rounded-xl border border-white/10 overflow-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Wins</th>
            <th className="text-left p-3">Losses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">Polearm or hafted two handed</td>
            <td className="p-3">3</td>
            <td className="p-3">2</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
