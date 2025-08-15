
export enum VideoModel {
  VEO_2_0 = 'veo-2.0-generate-001',
  VEO_3_0_FAST = 'veo-3.0-fast-generate-preview',
  VEO_3_0 = 'veo-3.0-generate-preview',
}

export enum VideoStyle {
  ANIMATION = 'Animation',
  LIVE_ACTION = 'Live-Action',
  SCI_FI = 'Sci-Fi',
  FANTASY = 'Fantasy',
  DOCUMENTARY = 'Documentary',
  VINTAGE = 'Vintage Film',
}

export enum VideoTone {
  SERIOUS = 'Serious',
  COMICAL = 'Comical',
  TOUCHING = 'Touching',
  DRAMATIC = 'Dramatic',
  UPLIFTING = 'Uplifting',
  SUSPENSEFUL = 'Suspenseful',
}

export enum VideoLength {
  SHORT = '15 seconds',
  MEDIUM = '30 seconds',
  LONG = '60 seconds',
}

export interface UserInput {
  theme: string;
  style: VideoStyle;
  tone: VideoTone;
  length: VideoLength;
  model: VideoModel;
}