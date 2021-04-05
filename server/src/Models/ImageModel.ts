export interface BaseImageModel {
  idActivity: number;
}

export interface ImageModel extends BaseImageModel {
  binary: Blob;
}
