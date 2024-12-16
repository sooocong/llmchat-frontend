import React from 'react';
import ReactDOM from 'react-dom';
import closeIcon from '../../assets/close2.svg'; // ✅ close2.svg 아이콘 추가
import './MypageModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MypageModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close" onClick={onClose}>
          <img src={closeIcon} alt="닫기" className="close-icon" />
        </button>
        {children}
      </div>
    </div>,
    document.body // 모달을 최상위로 렌더링
  );
};

export default MypageModal;
