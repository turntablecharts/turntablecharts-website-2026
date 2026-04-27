export type PhotoItem = {
  id: number;
  title: string;
  link: string;
  galleryType: number; // 1 = video embed, 2 = image
};

export type GalleryResponse = {
  galleries: PhotoItem[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  galleryType: number | null;
};
