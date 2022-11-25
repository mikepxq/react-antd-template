import React from 'react';
import styled from 'styled-components';
import PartItem from './part-item';

interface Props {
  list?: ArticleModuleItem[];
}

const JsonEditorPreview: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', list = [] } = props;
  //render
  return (
    <Wrap className={` json-editor-preview template-0 ${className}`}>
      {/* 模块列表 */}
      {list.map((item, index) => (
        <div className={`module-item module-item-${index}`} key={`module-item-${index}`}>
          {item.title && <h2 className="title">{item.title}</h2>}
          <div className={`part-wrap `}>
            {/* 段落列表  */}
            {item.partList &&
              item.partList.map((item, index) => {
                item._partKey = `part-item-${index}`; //挂载值
                return <PartItem item={item} {...item} partKey={item._partKey} key={item._partKey}></PartItem>;
              })}
          </div>
        </div>
      ))}
    </Wrap>
  );
};
const Wrap = styled.section`
  &.template-0 {
    background-color: #fff;
    p {
      margin: 0;
    }
    .module-item {
      > .title {
        color: #ff9e3c;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
      }

      .part-item {
        & + .part-item {
          margin-top: 10px;
        }
        > .title {
          padding: 10px 14px;
          background-color: #e2e2e2;
          height: 40px;
          line-height: 20px;
          font-size: 16px;
          color: #333;
          & + .list {
            margin-top: 10px;
          }
        }

        .list {
          color: rgba(0, 0, 0, 0.6);
          font-size: 13px;
          &.list-style-common {
            > * {
              margin-top: 10px;
            }
          }
          &:not(.list-style-common) {
            padding-left: 20px;
            > * {
              margin-top: 5px;
            }
          }
          &.list-style-number {
            > * {
              list-style: auto;
            }
          }
          &.list-style-alpha {
            > * {
              list-style: lower-alpha;
            }
          }
          &.list-style-disc {
            > li {
              list-style: disc;
            }
          }
        }
        .part-item-table {
          thead {
            th {
              background-color: #222;
              color: #fff;
            }
          }
          tbody {
            background-color: #333;
            color: #fff;
            tr:hover {
              > * {
                background-color: transparent;
              }
            }
            td {
              padding: 0;
              .text-wrap {
                padding: 16px;
                &.empty {
                  background-color: #999999;
                  color: #999999; //颜色一样就看不出有内容
                  user-select: none;
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default React.memo(JsonEditorPreview);
