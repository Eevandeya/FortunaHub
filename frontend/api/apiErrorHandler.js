export const requestErrorInterceptor = (axiosInstance, errorHandler) => {
    axiosInstance.interceptors.request.use(
      (config) => config,
      (error) =>
      {   if(errorHandler) {
          errorHandler(error, "api",
            {
                type: "request",
                config: error.config
            }
          )
          return Promise.reject(error)
        }
      }
    );
};

export const responseErrorInterceptor = (axiosInstance, errorHandler) => {

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
          if(errorHandler) {
              errorHandler(error, "api",
                {
                    type: "response",
                    status: error.response?.status,
                    url: error.config?.url,
                    method: error.config?.method
                })
              return Promise.reject(error)
          }
      }
    )
}
