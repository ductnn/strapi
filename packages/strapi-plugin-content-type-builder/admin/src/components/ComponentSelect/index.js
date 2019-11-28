import React, { useRef } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import MenuList from './MenuList';
import MultipleMenuList from './MultipleMenuList';
import Value from './Value';

const ComponentSelect = ({
  addComponentsToDynamicZone,
  componentCategoryNeededForAddingAfieldWhileCreatingAComponent,
  componentNameNeededForAddingAfieldWhileCreatingAComponent,
  isCreatingComponentWhileAddingAField,
  isMultiple,
  onChange,
  name,
  value,
  styles,
}) => {
  // Create a ref in order to access the StateManager
  // So we can close the menu after clicking on a menu item
  // This allows us to get rid of the menuIsOpen state management
  // So we let the lib taking care of it
  // It's not the best practice but it is efficient
  const ref = useRef();
  const handleChange = (inputValue, actionMeta) => {
    const { action } = actionMeta;

    if (action === 'clear') {
      onChange({ target: { name, value: '' } });
    }
  };

  const MenuListCompo = isMultiple ? MultipleMenuList : MenuList;

  return (
    <Select
      addComponentsToDynamicZone={addComponentsToDynamicZone}
      isClearable={!isMultiple}
      isDisabled={isCreatingComponentWhileAddingAField}
      isCreatingComponent={isCreatingComponentWhileAddingAField}
      isMultiple={isMultiple}
      componentCategory={
        componentCategoryNeededForAddingAfieldWhileCreatingAComponent
      }
      componentName={componentNameNeededForAddingAfieldWhileCreatingAComponent}
      name={name}
      onChange={handleChange}
      onClickOption={onChange}
      styles={styles}
      value={{ label: value, value }}
      options={[]}
      ref={ref}
      // menuIsOpen
      refState={ref}
      components={{
        MenuList: MenuListCompo,
        SingleValue: Value,
      }}
    />
  );
};

ComponentSelect.defaultProps = {
  componentCategoryNeededForAddingAfieldWhileCreatingAComponent: null,
  componentNameNeededForAddingAfieldWhileCreatingAComponent: null,
  isCreatingComponentWhileAddingAField: false,
  isMultiple: false,
  value: null,
};

ComponentSelect.propTypes = {
  addComponentsToDynamicZone: PropTypes.func.isRequired,
  componentCategoryNeededForAddingAfieldWhileCreatingAComponent:
    PropTypes.string,
  componentNameNeededForAddingAfieldWhileCreatingAComponent: PropTypes.string,
  isCreatingComponentWhileAddingAField: PropTypes.bool,
  isMultiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  styles: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default ComponentSelect;
