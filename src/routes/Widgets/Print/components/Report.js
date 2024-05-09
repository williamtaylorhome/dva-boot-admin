import React, { Component } from 'react';
import { Checkbox } from 'antd';
import './report.less';
const CheckboxGroup = Checkbox.Group;

/**
 * Sample report printing
 */
class Report extends Component {
  render() {
    const plainOptions = [
      {value: '1066001', label: 'Development and implementation'},
      {value: '1066002', label: 'Test'},
      {value: '1066003', label: 'Test run'},
    ];
    return (
      <div className="system-audit-pring">
        <table className="tg">
          <tbody>
          <tr>
            <th className="tg-wp8o" colSpan="5">
              <h1>XX deployment/implementation will be signed</h1>
              <h3 className="version">Version number: 20181121</h3>
            </th>
          </tr>
          <tr>
            <td className="tg-obcv left1" rowSpan="5">Fill in the fields for the applicant</td>
            <td className="tg-obcv left2 hfixed">The name of the system</td>
            <td className="tg-73oq" colSpan="3"></td>
          </tr>
          <tr>
            <td className="tg-obcv left2 hfixed">System status</td>
            <td className="tg-73oq" colSpan="3">
              <CheckboxGroup options={plainOptions} />
            </td>
          </tr>
          <tr>
            <td className="tg-obcv left2 hfixed">Responsible for the system business unit</td>
            <td className="tg-73oq" colSpan="3"></td>
          </tr>
          <tr>
            <td className="tg-obcv left2">System description</td>
            <td className="tg-73oq xtsm-content" colSpan="3">
              <i>(Briefly describe the basic situation of the system: main functions, deployment methods, hardware architecture, software architecture, etc.) Such as: the type of server required, the number, the configuration; Application database types and versions, etc. ）</i>
              <p></p>
            </td>
          </tr>
          <tr>
            <td className="tg-73oq h20" colSpan="2">
              <div className="w50">
                Applicants: 
                <div className="sign">Signature of the person in charge:<br />(Stamped with the official seal)</div>
                <div className="date">&nbsp; &emsp; &emsp; </div>
              </div>
            </td>
            <td className="tg-73oq" colSpan="2">
              <div className="w50">
                Implementing Units: 
                <div className="sign">Signature of the person in charge:<br />(Stamped with the official seal)</div>
                <div className="date">&nbsp; &emsp; &emsp;</div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="tg-qtf5 left1">Approve the item</td>
            <td className="tg-73oq h20" colSpan="2">
              <div className="w50">
                Business Unit Opinions:
                <p></p>
                <div className="sign">Signature of the person in charge:<br />(Stamped with the official seal)</div>
                <div className="date">&nbsp; &emsp; &emsp;</div>
              </div>
            </td>
            <td className="tg-73oq" colSpan="2">
              <div className="w50">
                Opinions of the Ministry of Science and Technology Information:
                <p></p>
                <div className="sign">Signature of the person in charge:<br />(Stamped with the official seal)</div>
                <div className="date">&nbsp; &emsp; &emsp;</div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Report;