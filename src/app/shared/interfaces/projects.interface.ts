export interface ProjectsInterface {
  name: string;
  index: number;
  pLangs: {pLang: string, pIconSrc: string}[];
  description: {english: string, german: string};
  imageSrc: string;
  gitHubLink: string;
  link: string;
  sideImageShown: boolean;
}