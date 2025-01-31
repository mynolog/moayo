import type { AxiosResponse } from 'axios';
import type { BooksQueryParams, BooksResponse, BooksResponseData } from '@/types/book.type';
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';

export const useBooks = (queryParams: BooksQueryParams) => {
  const data = reactive<BooksResponseData>({
    title: '',
    itemsPerPage: 0,
    startIndex: 0,
    totalResults: 0,
    books: [],
  });

  const initialLoading = ref(false);
  const loadMoreLoading = ref(false);
  const error = ref<unknown | null>(null);

  // 데이터 로드 함수
  const loadBooks = async (reset: boolean) => {
    if (initialLoading.value || loadMoreLoading.value) return;

    if (reset) initialLoading.value = true;
    else loadMoreLoading.value = true;

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
      if (reset) initialLoading.value = false;
      else loadMoreLoading.value = false;
    }
  };

  // queryParams.queryType이 변경되면 데이터를 새로 불러오기
  watch(
    () => queryParams.queryType, // queryParams.queryType 변경 감지
    () => {
      loadBooks(true); // queryType 변경 시 기존 데이터 초기화하고 새로 불러오기
    },
  );

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
      !loadMoreLoading.value &&
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

  return { data, initialLoading, loadMoreLoading, error, loadBooks };
};
