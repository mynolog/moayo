import { ref, reactive, onMounted, onUnmounted } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';
import type { BooksQueryParams, BooksResponse, BooksResponseData } from '@/types/book.type';
import type { AxiosResponse } from 'axios';

export const useBooks = (query?: BooksQueryParams) => {
  const data = reactive<BooksResponseData>({
    title: '',
    itemsPerPage: 0,
    startIndex: 0,
    totalResults: 0,
    books: [],
  });

  // queryParams: 기본값 설정 및 query 병합
  const queryParams = reactive<BooksQueryParams>({
    queryType: query?.queryType || 'Bestseller',
    start: query?.start || 1,
    maxResults: query?.maxResults || 20,
  });

  const isLoading = ref(false);
  const error = ref<unknown | null>(null);

  // 데이터 로드 함수
  const loadBooks = async (reset: boolean) => {
    if (isLoading.value) return; // 이미 로딩 중이라면 중복 호출 방지

    isLoading.value = true;

    try {
      if (reset) data.books = []; // 초기 요청 시 기존 데이터 초기화

      const { data: responseData }: AxiosResponse<BooksResponse> = await api.get(ROUTES.BOOKS, {
        params: {
          queryType: queryParams.queryType,
          start: queryParams.start,
          maxResults: queryParams.maxResults,
        },
      });

      if (responseData.data.books.length > 0) {
        data.books.push(...responseData.data.books); // 기존 데이터에 추가
        data.totalResults = responseData.data.totalResults; // totalResults 업데이트
        data.startIndex = responseData.data.startIndex; // 응답에서 startIndex 업데이트
      }
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  // 스크롤 처리 함수 (무한 스크롤)
  const handleScroll = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const threshold = 100; // 여유 값

    if (
      // 현재 스크롤 된 위치 기준으로 하단까지 남은 거리 - 남은 스크롤 영역 = 100px 보다 작을 때
      scrollHeight - scrollTop - windowHeight <= threshold &&
      // 데이터를 로딩 중이 아닐 때
      !isLoading.value &&
      // 총 결과 수가 로드된 수보다 많을 경우
      data.books.length < data.totalResults
    ) {
      queryParams.start = Math.ceil(data.books.length / (queryParams.maxResults ?? 20)) + 1;
      loadBooks(false);
    }
  };

  onMounted(() => {
    loadBooks(true); // 초기 데이터 요청 (기존 데이터 초기화)
    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { data, isLoading, error };
};
