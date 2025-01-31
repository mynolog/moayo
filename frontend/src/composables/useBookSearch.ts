import type { AxiosResponse } from 'axios';
import type { BookSearchQueryParams, BooksResponse, BooksResponseData } from '@/types/book.type';
import { ref, reactive, watch } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';
import { debounce } from '@/utils/utils';

export const useBookSearch = () => {
  const data = reactive<BooksResponseData>({
    title: '',
    itemsPerPage: 0,
    startIndex: 0,
    totalResults: 0,
    books: [],
  });

  const queryParams = reactive<BookSearchQueryParams>({
    query: '',
    queryType: 'keyword',
    sort: 'accuracy',
    start: 1,
    maxResults: 10,
  });

  const isLoading = ref(false);
  const error = ref<unknown | null>(null);
  const isDropdownVisible = ref(false);

  const searchBooks = async () => {
    if (!queryParams.query.trim()) {
      data.books = [];
      isDropdownVisible.value = false;
      return;
    }
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      const { data: responseData }: AxiosResponse<BooksResponse> = await api.get(
        ROUTES.BOOK_SEARCH,
        { params: queryParams },
      );

      data.books = responseData.data.books;
      isDropdownVisible.value = data.books.length > 0;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  const debouncedSearch = debounce(searchBooks, 500);

  // 검색어 변경 시 디바운스 적용하여 자동 검색
  watch(
    () => queryParams.query,
    () => {
      debouncedSearch();
    },
  );

  const hideDropdown = () => {
    setTimeout(() => {
      isDropdownVisible.value = false;
    }, 200);
  };

  return { queryParams, searchData: data, isLoading, error, isDropdownVisible, hideDropdown };
};
