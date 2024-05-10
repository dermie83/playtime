export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  }
  
  export type Group = {
    _id: any;
    title: string;
    img: string;
    userid: User | string;
  }
  
  export interface Lighthouse {
    title: string;
    towerHeight: number;
    lightHeight: number;
    character: string;
    daymark: string;
    range: number;
    latitude: number;
    longitude: number;
    groupid: Group | string;
  }

  export type Db = {
    userStore: any;
    groupStore: any;
    lighthouseStore: any;
  }