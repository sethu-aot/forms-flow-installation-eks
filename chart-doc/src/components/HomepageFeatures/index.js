import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Why We Use Helm chart',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      A Helm chart can simplify the deployment of a complex system like Formaflow.ai, which includes multiple components, by packaging all the necessary configurations, dependencies, and setup steps. Here’s how a Helm chart will help with the installation of these components:
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row " style={{justifyContent:"center"}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
