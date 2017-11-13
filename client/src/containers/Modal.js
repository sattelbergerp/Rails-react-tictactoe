import React from 'react';

export default props => {
  return (<div className="modal" role="dialog" style={{display: 'block'}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title">{props.title}</h3>
        <button type="button" className="close" onClick={props.onClose} disabled={props.loading}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {props.children}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={props.onSubmit}  disabled={props.loading}>
        {props.loading? (<div className="mini-loader"><div /><div /><div /></div>) : props.submitText}</button>
        <button type="button" className="btn btn-secondary" onClick={props.onClose} disabled={props.loading}>Close</button>
      </div>
    </div>
  </div>
</div>);
}
