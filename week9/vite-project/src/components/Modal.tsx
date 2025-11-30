import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { closeModal } from '../slices/modalSlice';
import { useCartActions } from '../hooks/useCartStore';

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const {clearCart} = useCartActions();

  if (!isOpen) return null; // isOpen=false → 모달 렌더링 X

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <h2 className="mb-4">정말 장바구니를 비우시겠습니까?</h2>

        <div className="flex justify-between gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => dispatch(closeModal())}
          >
            아니요
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => {
              clearCart();
              dispatch(closeModal());
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
