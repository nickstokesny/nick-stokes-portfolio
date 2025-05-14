import Image from "next/image"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="about" />

      <div className="w-full h-px bg-gray-200 mt-2"></div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-16 text-center">ABOUT</h1>

          {/* Two-column layout for portrait and bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            {/* Portrait column */}
            <div className="order-2 md:order-1">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/nick-portrait-placeholder.png"
                  alt="Nick Stokes"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio column */}
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-8">NICK STOKES</h2>
              <div className="prose prose-lg">
                <p className="mb-6 text-lg leading-relaxed">
                  Nick Stokes is a photographer and director based in New York with over 15 years of experience in the
                  visual arts industry. His career began in professional retouching, where he developed a meticulous eye
                  for detail and a deep understanding of image composition. This foundation gave him a unique
                  perspective when he later moved behind the camera, allowing him to envision the final image while
                  shooting and approach each project with the entire creative process in mind.
                </p>

                <p className="mb-6 text-lg leading-relaxed">
                  Over the years, Nick has built a reputation for his distinctive visual style that emphasizes bold
                  compositions, precise lighting, and a refined aesthetic sensibility. His photography portfolio spans
                  multiple genres including fashion, portraits, beauty, still life, and product photography. In each
                  area, Nick brings his signature approach—finding the essential visual elements that make each subject
                  compelling and presenting them with clarity and impact. His fashion work balances commercial appeal
                  with editorial creativity, while his portrait photography captures both the outward appearance and
                  inner character of his subjects.
                </p>

                <p className="mb-6 text-lg leading-relaxed">
                  Nick's background in photography informs his directing style, resulting in work that is visually rich
                  and emotionally resonant. Throughout his career, he has collaborated with a diverse range of clients
                  from global brands to independent creators. Whether working on a major campaign or a personal project,
                  Nick brings the same commitment to visual excellence and creative problem-solving to every shoot.
                </p>
              </div>
            </div>
          </div>

          {/* Clients section */}
          <div className="mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-12 text-center">CLIENTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 1</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 2</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 3</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 4</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 5</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 6</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 7</span>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-xl font-light text-gray-500">Client 8</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}