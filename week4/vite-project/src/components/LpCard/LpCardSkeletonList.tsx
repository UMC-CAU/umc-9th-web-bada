import LpCardSkeleton from "../LpCard/LpCardSkeleton.tsx";

interface LpCardSkeletonListProps {
  count: number;
}

const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx}/> 
        ))}
    </>
  );
} 

export default LpCardSkeletonList;