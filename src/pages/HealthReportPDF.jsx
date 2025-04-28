import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

const HealthReportPDF = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text>Health Report</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.text}>Name: {data.name}</Text>
        <Text style={styles.text}>Age: {data.age}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>BMI Results</Text>
        <Text style={styles.text}>Weight: {data.weight} kg</Text>
        <Text style={styles.text}>Height: {data.height} cm</Text>
        <Text style={styles.text}>BMI: {data.bmi}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Blood Report</Text>
        <Text style={styles.text}>Blood Pressure: {data.bloodPressure} mmHg</Text>
        <Text style={styles.text}>Blood Sugar: {data.bloodSugar} mg/dL</Text>
        <Text style={styles.text}>Cholesterol: {data.cholesterol} mg/dL</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Diet Log</Text>
        {data.diet.map((item, index) => (
          <Text key={index} style={styles.text}>• {item}</Text>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Health Analysis</Text>
        <Text style={styles.text}>{data.analysis}</Text>
      </View>
    </Page>
  </Document>
);

export default HealthReportPDF;