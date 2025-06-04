import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

interface LoadingContextType {
  showLoading: (timeoutMs?: number) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutByAutoRef = useRef<boolean>(false);

  const showLoading = (timeoutMs: number = 10000) => {
    setIsLoading(true);
    timeoutByAutoRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutByAutoRef.current = true;
      hideLoading();

      // alert 알림 표시
      alert("요청이 지연되고 있습니다.");
    }, timeoutMs);
  };

  const hideLoading = () => {
    setIsLoading(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 수동으로 종료된 경우에는 알림 표시 안 함
    timeoutByAutoRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
