import React from 'react'
import {
  Image,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = React.ComponentProps<typeof Modal> & {
  onRequestClose?: () => void,
  title: string,
  style?: StyleProp<ViewStyle>,
}

function ModalRegular({ onRequestClose, title, style, children, ...rest }: Props): JSX.Element {
  return (
    <Modal transparent onRequestClose={onRequestClose} {...rest}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <View style={styles.container3}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={style}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 16,
  },
  container2: {
    backgroundColor: '#F1F5FA',
    borderRadius: 16,
    padding: 16,
  },
  container3: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#313D4F',
    fontSize: 17,
    fontWeight: '700',
  },
})

export default ModalRegular
