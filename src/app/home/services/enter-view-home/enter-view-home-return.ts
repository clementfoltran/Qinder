export interface EnterViewHomeReturn {
  success: true;
  message: '';
  id: number;
  firstname: string;
  lastname: string;
  bio: string;
  distance: number;
  minage: number;
  maxage: number;
  gender: string;
  interest: string;
  position: {
    latitude: number,
    longitude: number
  };
  confirm: boolean;
}
