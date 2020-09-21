export type PhotoUrls = {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
}

export type PhotoLinks = {
  self: string
  html: string
  download: string
  download_location: string
}

export type PhotoUserLinks = {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
  following: string
  followers: string
}

export type PhotoUserProfileImage = {
  small: string
  medium: string
  large: string
}

export type PhotoUser = {
  id: string
  updated_at: string
  username: string
  name: string | null
  first_name: string | null
  last_name: string | null
  twitter_username: string | null
  portfolio_url: string | null
  bio: string | null
  location: string | null
  links: PhotoUserLinks
  profile_image: PhotoUserProfileImage
  instagram_username: string | null
  total_collections: number
  total_likes: number
  total_photos: number
  accepted_tos: boolean
}

export type PhotoItem = {
  id: string
  created_at: string
  updated_at: string
  promoted_at: string | null
  width: number
  height: number
  color: string
  description: string | null
  alt_description: string | null
  urls: PhotoUrls
  links: PhotoLinks
  categories: unknown[]
  likes: number
  liked_by_user: boolean
  current_user_collections: unknown[]
  sponsorship: unknown | null
  user: PhotoUser
}
