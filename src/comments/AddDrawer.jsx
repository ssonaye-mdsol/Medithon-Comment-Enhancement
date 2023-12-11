import React from 'react';
import { Button, Icon, TextArea } from '@mdsol/onex-design';
import './AddDrawer.scss';

const AddDrawer = ({
  handleCancelButtonClick,
  handleCheckButtonClick,
  textValue,
  setTextValue,
  placeholder,
  maxLength,
}) => {
  return (
    <>
      <TextArea
        className="add-drawer-text-area"
        dataTestId="add-drawer-text-area"
        errorMessage={`Cannot exceed ${maxLength} characters'`}
        placeholder={placeholder}
        onChange={setTextValue}
        maxNumLength={maxLength}
        value={textValue}
        rows={2}
      />
      <div className="add-drawer-btns">
        <Button
          buttonType="icon"
          size="sm"
          dataTestId="add-drawer-check-btn"
          onClick={handleCheckButtonClick}
          disabled={!textValue.trim().length || textValue.length > maxLength}
        >
          <Icon>check</Icon>
        </Button>
        <Button
          buttonType="icon"
          variant="secondary"
          buttonStyle="ghost"
          size="sm"
          className="ms-2"
          dataTestId="add-drawer-cancel-btn"
          onClick={handleCancelButtonClick}
        >
          <Icon>close</Icon>
        </Button>
      </div>
    </>
  );
};

export default AddDrawer;
