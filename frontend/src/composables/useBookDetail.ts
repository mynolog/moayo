import type { AxiosResponse } from 'axios';
import type {
  BookDetailQueryParams,
  BookDetailResponse,
  BookDetailResponseData,
} from '@/types/book.type';
import { ref, reactive, onMounted } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';

export const useBookDetail = (isbn13: string) => {
  const data = reactive<BookDetailResponseData>({
    bookDetail: {
      title: '',
      author: '',
      pubDate: '',
      description: '',
      isbn13: '',
      publisher: '',
      cover: '',
      link: '',
      subInfo: {
        subTitle: '',
        originalTitle: '',
        itemPage: 0,
      },
    },
  });

  const queryParams = reactive<BookDetailQueryParams>({
    itemId: isbn13,
    itemIdType: 'isbn13',
  });

  const isLoading = ref(false);
  const error = ref<unknown | null>(null);

  const loadBookDetail = async () => {
    if (!queryParams.itemId.trim()) {
      return;
    }

    isLoading.value = true;

    try {
      const { data: responseData }: AxiosResponse<BookDetailResponse> = await api.get(
        ROUTES.BOOK_DETAIL(isbn13),
        {
          params: {
            itemIdType: queryParams.itemIdType,
          },
        },
      );

      if (responseData.data.bookDetail) {
        Object.assign(data.bookDetail, responseData.data.bookDetail);
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadBookDetail();
  });

  return { data, isLoading, error };
};
