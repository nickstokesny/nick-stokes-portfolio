export default function MinimalTailwindTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal Tailwind Test</h1>
      <div className="bg-blue-500 text-white p-4 rounded">
        This should have blue background and white text if Tailwind is working.
      </div>
    </div>
  )
}