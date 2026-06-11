export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: GalleryItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  role?: string;
  review: string;
  rating: number;
  image: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  city: string;
  serviceType: string;
  budgetRange: string;
  message: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'In Progress';
  uploadedFile?: {
    name: string;
    size: string;
    type: string;
    previewUrl?: string;
  };
}
