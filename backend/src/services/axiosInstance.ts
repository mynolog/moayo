import '@/config/dotenv';
import type { AladinDefaultQueryParams } from '@/types/aladinApi';
import axios from 'axios';
import { ConfigurationError } from '@/errors/ConfigurationError';

const baseURL = process.env.ALADIN_BASE_URL;
const ttbKey = process.env.ALADIN_TTB_KEY;

if (!baseURL) {
  throw new ConfigurationError(500, 'ALADIN_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

if (!ttbKey) {
  throw new ConfigurationError(500, 'ALADIN_TTB_KEY 환경 변수가 설정되지 않았습니다.');
}

const axiosInstance = axios.create({
  baseURL: baseURL as string,
  params: {
    ttbKey: ttbKey as string,
    searchTarget: 'book',
    inputEncoding: 'utf-8',
    output: 'js',
    version: '20131101',
    cover: 'big',
  } as AladinDefaultQueryParams,
});

export default axiosInstance;
