import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Icon from 'Components/icon/icon.jsx';
import Body from './modal-body.jsx';
import Footer from './modal-footer.jsx';
import { useOnClickOutside } from '../../hooks/use-onclickoutside';

const ModalElement = ({
    elements_to_ignore,
    has_close_icon,
    onMount,
    onUnmount,
    is_open,
    toggleModal,
    id,
    title,
    className,
    is_vertical_centered,
    is_vertical_bottom,
    is_vertical_top,
    header,
    children,
    height,
    width,
    small,
}) => {
    const el_ref = React.useRef(document.createElement('div'));
    const modal_root_ref = React.useRef(document.getElementById('modal_root'));
    const wrapper_ref = React.useRef();

    const is_datepicker_visible = () => modal_root_ref.current.querySelectorAll('.dc-datepicker__picker').length;

    const validateClickOutside = e =>
        has_close_icon &&
        !is_datepicker_visible() &&
        is_open &&
        !(elements_to_ignore && e?.path.find(el => elements_to_ignore.includes(el)));

    useOnClickOutside(wrapper_ref, toggleModal, validateClickOutside);

    React.useEffect(() => {
        el_ref.current.classList.add('dc-modal');
        modal_root_ref.current.appendChild(el_ref.current);
        if (typeof onMount === 'function') onMount();

        return () => {
            modal_root_ref.current.removeChild(el_ref.current);
            if (typeof onUnmount === 'function') onUnmount();
        };
    }, []);

    return ReactDOM.createPortal(
        <div
            ref={wrapper_ref}
            id={id}
            className={classNames('dc-modal__container', {
                [`dc-modal__container_${className}`]: className,
                'dc-modal__container--small': small,
                'dc-modal__container--is-vertical-centered': is_vertical_centered,
                'dc-modal__container--is-vertical-bottom': is_vertical_bottom,
                'dc-modal__container--is-vertical-top': is_vertical_top,
            })}
            style={{
                height: height || 'auto',
                width: width || 'auto',
            }}
        >
            {(header || title) && (
                <div
                    className={classNames('dc-modal-header', {
                        [`dc-modal-header--${className}`]: className,
                    })}
                >
                    {title && (
                        <h3
                            className={classNames('dc-modal-header__title', {
                                [`dc-modal-header__title--${className}`]: className,
                            })}
                        >
                            {title}
                        </h3>
                    )}
                    {header && (
                        <div
                            className={classNames('dc-modal-header__section', {
                                [`dc-modal-header__section--${className}`]: className,
                            })}
                        >
                            {header}
                        </div>
                    )}
                    {has_close_icon && (
                        <div onClick={toggleModal} className='dc-modal-header__close'>
                            <Icon icon='IcCross' />
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>,
        el_ref.current
    );
};

ModalElement.defaultProps = {
    has_close_icon: true,
};

ModalElement.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    has_close_icon: PropTypes.bool,
    header: PropTypes.node,
    id: PropTypes.string,
    is_open: PropTypes.bool,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    small: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    toggleModal: PropTypes.func,
    elements_to_ignore: PropTypes.array,
};

const Modal = ({
    children,
    className,
    header,
    id,
    is_open,
    has_close_icon,
    height,
    onMount,
    onUnmount,
    small,
    is_vertical_bottom,
    is_vertical_centered,
    is_vertical_top,
    title,
    toggleModal,
    width,
    elements_to_ignore,
}) => (
    <CSSTransition
        appear
        in={is_open}
        timeout={250}
        classNames={{
            appear: 'dc-modal__container--enter',
            enter: 'dc-modal__container--enter',
            enterDone: 'dc-modal__container--enter-done',
            exit: 'dc-modal__container--exit',
        }}
        unmountOnExit
    >
        <ModalElement
            className={className}
            header={header}
            id={id}
            is_open={is_open}
            is_vertical_bottom={is_vertical_bottom}
            is_vertical_centered={is_vertical_centered}
            is_vertical_top={is_vertical_top}
            title={title}
            toggleModal={toggleModal}
            has_close_icon={has_close_icon}
            height={height}
            onMount={onMount}
            onUnmount={onUnmount}
            small={small}
            width={width}
            elements_to_ignore={elements_to_ignore}
        >
            {children}
        </ModalElement>
    </CSSTransition>
);

Modal.Body = Body;
Modal.Footer = Footer;

Modal.defaultProps = {
    has_close_icon: true,
};

Modal.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    has_close_icon: PropTypes.bool,
    header: PropTypes.node,
    height: PropTypes.string,
    id: PropTypes.string,
    is_open: PropTypes.bool,
    is_vertical_bottom: PropTypes.bool,
    is_vertical_centered: PropTypes.bool,
    is_vertical_top: PropTypes.bool,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    small: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    toggleModal: PropTypes.func,
    width: PropTypes.string,
    elements_to_ignore: PropTypes.array,
};

export default Modal;
