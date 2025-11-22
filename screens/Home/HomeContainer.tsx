import { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import { ISampleData, sampleData } from "../../assets/sampleData";

const HomeContainer = () => {
  // State
  const [data, setData] = useState<ISampleData[]>();
  const [loading, setLoading] = useState<boolean>(true);

  // Need to converting your server api func
  const YourServerAPI = async (): Promise<ISampleData[]> => {
    return new Promise((resolve) => {
      // 3000ms(=3sec) 후에 Promise<sampleData>를 반환!
      setTimeout(() => {
        return resolve(sampleData);
      }, 1500);
    });
  };

  // 비동기)여러 Data를 서버든, Local 불러오는 역할
  const getData = async () => {
    try {
      // 1. Server, 저장소에서 Data 가져오기
      const data = await YourServerAPI();
      // 2. State에 할당
      setData(data);
    } catch (e) {
      // Error 발생 시
      console.error("HC, getData Error : ", e);
    } finally {
      // 무사히 가져오면 로딩 종료
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Rendering
  return <HomePresenter data={data} loading={loading} />;
};

export default HomeContainer;
