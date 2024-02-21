import { useHttp } from './http.hook';

const useRequestService = () => {
  const { request, loading, error } = useHttp();

  // no change variables
  const _apiBase =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/';
  const _apiKey = 'key=F82SRCSSJCSXC7SG497EWXBUP';

  const getData = async (city = 'Kyiv', date1 = 'today', date2) => {
    let res;
    try {
      res = await request(
        `${_apiBase}timeline/${city}/${date1}/${date2}?unitGroup=metric&${_apiKey}&contentType=json`
      );

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    loading,
    error,
    getData,
  };
};

export default useRequestService;
