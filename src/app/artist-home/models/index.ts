
export interface ShapedEntity{
  id:string,
  entity:any
}


export interface ArtistDto{
  producerId:string
  firstName:string
  lastName:string
  genre:string
  age:number
  liveIn:string
  email:string
  phoneNumber:string
  jobTitle:string
  bio:string
  facebook:string
  twitter:string
  linkedIn:string
}

export interface ArtistForManipulationDto {
  firstName:string
  lastName:string
  genre:string
  age:number
  liveIn:string
  email:string
  phoneNumber:string
  jobTitle:string
  bio:string
  facebook:string
  twitter:string
  linkedIn:string

}



export interface ArtistEventDto{
  eventId: string
  artistId:string
  name:string
  date:Date
  description:string
  url?:string
  city?:string
  country?:string
}

export interface ArtistEventForManipulationDto{
  categoryId:string
  name:string
  date:Date
  description:string
  url?:string
  city?:string
  country?:string
}

export interface FollowerForCreationDto{
followerId: string,
firstName:	string
lastName:	string
genre:string
age:number
liveIn:	string
phoneNumber:	string
email:	string
}


export interface AttendantForCreationDto{
attendantId:string,
firstName:	string,
lastName:	string,
genre:string,
age:number,
phoneNumber:string
email:	string
city:	string
}

export const eventValidationMessages: {
  [key: string]: { [key: string]: string };
} = {
  name: {
    required: 'Event Name Is Required.',
    minlength:'Event Name should be at least 3 characters'
  },
  category: {
    required: 'Category Is Required.',
  },
  date: {
    required: 'Date Is Required',
    invalidDate:'event date must be greater from now'
  },
  url: {
    required: 'URL Is Required',
  },
  city: {
    required: 'City Is Required',
  },
  description: {
    required: 'Description Is Required',
    minlength:'Description should be from 20 to 1000 characters'
  },
};
