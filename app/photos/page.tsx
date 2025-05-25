import Image from "next/image";

interface Photo {
  id: string;
  src: string;
  alt: string;
}

// Sample photos - in a real app, these would come from a CMS, API, or file system
const photos: Photo[] = [
  { 
    id: "photo1", 
    src: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ea",
    alt: "Minimalist architectural detail with clean lines and shadows"
  },
  { 
    id: "photo2", 
    src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538", 
    alt: "Urban landscape with geometric patterns"
  },
  { 
    id: "photo3", 
    src: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88", 
    alt: "Abstract architectural pattern with light and shadow"
  },
  { 
    id: "photo4", 
    src: "https://images.unsplash.com/photo-1683009427513-28e163402d16", 
    alt: "Minimalist interior with natural light"
  },
  { 
    id: "photo5", 
    src: "https://images.unsplash.com/photo-1682687219612-b12bdf21be9c", 
    alt: "Natural landscape with fog and minimal elements"
  },
  { 
    id: "photo6", 
    src: "https://images.unsplash.com/photo-1682687221213-56e250b36fdd", 
    alt: "Abstract architectural detail in black and white"
  },
  { 
    id: "photo7", 
    src: "https://images.unsplash.com/photo-1682685797886-79020b7462projected=2023-05-01T17%3A15%3A12.323Z", 
    alt: "Urban scene with minimal elements and strong contrast"
  },
  { 
    id: "photo8", 
    src: "https://images.unsplash.com/photo-1682687220067-dced9a881b56", 
    alt: "Architectural forms with strong lines and textures"
  },
  { 
    id: "photo9", 
    src: "https://images.unsplash.com/photo-1683009427034-8c79992cae8e", 
    alt: "Minimalist landscape with horizon line"
  }
];

export const metadata = {
  title: "Photos - My Blog",
  description: "A collection of minimalist photography",
};

export default function PhotosPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">Photos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-square relative overflow-hidden rounded-lg">
            <Image 
              src={`${photo.src}?auto=format&fit=crop&w=800&h=800&q=80`}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        All photos were chosen to represent a minimalist aesthetic. In a real implementation,
        this would showcase your personal photography.
      </p>
    </div>
  );
} 