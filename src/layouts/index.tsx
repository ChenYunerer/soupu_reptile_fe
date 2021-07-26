import React from 'react';
import { Link } from 'umi';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './index.less';

class IndexLayout extends React.Component {

  render() {
    const { children, location, route } = this.props;
    const newRoutes = route.routes.filter(item => item.showInMenu);
    route.routes = newRoutes;
    return (
      <div className={styles.ProLayoutDev}>
        <ProLayout
          title={'SOUPU-爬虫'}
          location={location}
          route={route}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl || menuItemProps.children) {
              return defaultDom;
            }
            if (menuItemProps.path && location.pathname !== menuItemProps.path) {
              return (
                <Link to={menuItemProps.path} target={menuItemProps.target}>
                  {defaultDom}
                </Link>
              );
            }
            return defaultDom;
          }}
        >
          <PageContainer>
            <Card>
              {children}
            </Card>
          </PageContainer>
        </ProLayout>
      </div>);
  }
}

export default IndexLayout;
