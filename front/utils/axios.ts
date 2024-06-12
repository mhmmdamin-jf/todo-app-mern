import axios, { AxiosRequestConfig } from "axios";
interface fetcherProps {
  url: string;
  data?: any;
  config?: AxiosRequestConfig<any>;
}
interface posterProps {
  url: string;
  data: any;
  config?: AxiosRequestConfig<any>;
}
export const fetcher = async ({ url, data, config }: fetcherProps) =>
  await axios
    .get(url, { params: data, ...config, withCredentials: true })
    .catch((err) => console.log(err));
export const poster = async ({ url, data, config }: posterProps) =>
  await axios
    .post(url, data, config || { withCredentials: true })
    .catch((err) => console.log(err));
