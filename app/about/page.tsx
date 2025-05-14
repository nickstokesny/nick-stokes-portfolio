import Image from "next/image"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="about" />

      <div className="w-full h-px bg-gray-200 mt-2"></div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-16">ABOUT</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <Image
              src="/professional-photographer-portrait.png"
              alt="Nick Stokes"
              width={600}
              height={800}
              className="w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">NICK STOKES</h2>

            <div className="space-y-6">
              <p>
                Nick Stokes is a photographer and director based in New York with over 15 years of experience in the
                visual arts industry. His career began in professional retouching, where he developed a meticulous eye
                for detail and a deep understanding of image composition. This foundation gave him a unique perspective
                when he later moved behind the camera, allowing him to envision the final image while shooting and
                approach each project with the entire creative process in mind.
              </p>

              <p>
                Over the years, Nick has built a reputation for his distinctive visual style that emphasizes bold
                compositions, precise lighting, and a refined aesthetic sensibility. His photography portfolio spans
                multiple genres including fashion, portraits, beauty, still life, and product photography. In each area,
                Nick brings his signature approach—finding the essential visual elements that make each subject
                compelling and presenting them with clarity and impact. His fashion work balances commercial appeal with
                editorial creativity, while his portrait photography captures both the outward appearance and inner
                character of his subjects.
              </p>

              <p>
                Nick's background in photography informs his directing style, resulting in work that is visually rich
                and emotionally resonant. Throughout his career, he has collaborated with a diverse range of clients
                from global brands to independent creators. Whether working on a major campaign or a personal project,
                Nick brings the same commitment to visual excellence and creative problem-solving to every shoot.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}