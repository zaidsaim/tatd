import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Paddings, Margins, BorderRadius, BorderWidths } from '../../assets/colors';

const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
 
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    
    padding: 20,
    elevation: 2,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor:'red'
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
     marginHorizontal:10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Margins.mh.mh30,
    width: '84%'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikethroughText: {
        color: Colors.darkgrey,
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        textDecorationLine: 'line-through',
        ...Margins.ml.ml20,
      },
  dot: {
    backgroundColor: Colors.primary,
    width: 5,
    height: 5,
    ...BorderRadius.br10,
    ...Paddings.p.p5,
  },
  dotGreen: {
    backgroundColor: 'green',
    width: 5,
    height: 5,
    ...BorderRadius.br10,
    ...Paddings.p.p5
  },
  labelText: {
    color: Colors.black,
    ...Margins.mh.mh7,
    fontSize: FontSizes.small,
  },

  picker: {
    height: 50,
    color: Colors.white,
  },
  pickerItemText: {
    fontSize: FontSizes.tinymedium,
    fontWeight: FontWeights.bold,
  },
  label: {
    fontSize: FontSizes.tinyxsmall,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  pickerContainer: {
    backgroundColor: Colors.orange,
    ...Paddings.p.p8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: Colors.white,
    height: 120,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 10
  },
  picker: {
    width: 130,
    height: 10,
    color: Colors.white,
  },
  pickerTime: {
    width: 135,
    height: 10,
    color: Colors.black,
    position: 'relative'
  },
  pickerDate: {
    width: 140,
   marginHorizontal:10,
    color: Colors.black,
  },
  pickerItem: {
    fontSize: FontSizes.xbody,
    color: Colors.white,
    fontWeight: FontWeights.bold
  },
  roudtripcontainer: {
    ...Margins.mv.mv7,
    height: 22,
    position: 'absolute',
    width: '48%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  imageContainer: {
    ...Margins.mv.mv7,
    height: 22,
    position: 'absolute',
    width: '60%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  icon: {
    fontSize: FontSizes.tinyxsmall,
    backgroundColor: 'blue'
  },
  selectedValue: {
    ...Margins.mt.mt20,
    fontSize: FontSizes.tinyxsmall,
    color: Colors.white,
  },
  input: {
    ...Paddings.p.p4,
    fontSize: FontSizes.xsmall,
    color: Colors.black,
    width: '100%',
    flex:1
  },
  RoundTripView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
  },
  oneWayView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mh.mh15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.white,
  },
  activeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  inactiveButton: {
    backgroundColor: Colors.white,
    borderColor: '#ccc',
    ...BorderWidths.bw.bw1,
  },
  activeText: {
    color: Colors.white,
  },
  inactiveText: {
    color: Colors.darkgrey,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Margins.mt.mt20,
  },
  button: {
    ...Paddings.pv.pv10,
    ...Paddings.ph.ph20,
  },
  closeButtonHour: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt10,
    ...Margins.mb.mb20,
    ...BorderRadius.br20,
    ...BorderWidths.bw.bw2,
    borderColor: Colors.white,
    ...Paddings.p.p5,
  },
  closeButton: {
    backgroundColor: Colors.white,
  },
  confirmButton: {
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontSize: FontSizes.medium,
    textAlign: 'center',
    color: Colors.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentBooking: {
    backgroundColor: Colors.lightblue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  modalView: {
    backgroundColor: Colors.white,
    ...BorderRadius.br10,
    ...Paddings.p.p20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonsContainer: {
    borderColor: Colors.darkgrey,
    ...Margins.mt.mt10
  },
  radioButtonTextStandard: {
    fontSize: FontSizes.medium,
    ...Margins.mh.mh20,
    color: Colors.darkgrey,
  },
  radioButtonText: {
    fontSize: FontSizes.medium,
    color: Colors.darkgrey,
    ...Margins.mh.mh20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '50%',
    paddingVertical: 5,
    borderRadius: 1,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: FontSizes.medium,
    color: Colors.white,
    textAlign: 'center',
  },
  optionContainer: {
    width: '49%',
    height: 110,
    position: 'relative',
  },
  icon: {
    ...Paddings.p.p10,
    position: 'relative',
  },
  overlayIconContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    ...Paddings.p.p10,
  },
  //
  pickerContainer: {
        backgroundColor: Colors.orange,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row',
    
      },
      containerSelectHour: {
            width: '34%',
            height:17,
          },
           dotGreen: {
    backgroundColor: 'green',
    width: 5,
    height: 5,
    borderRadius: 10,
    ...Paddings.p.P5
  },
  mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Margins.mh.mh30,
        width: '84%',
        marginTop:10
      },
      dotGreen: {
            backgroundColor: 'green',
            width: 5,
            height: 5,
            borderRadius: 10,
            ...Paddings.p.p5
          },
          //
          containerSelectkms: {
            width: '34%',
            height:17,
          },
           dotGreen: {
    backgroundColor: 'green',
    width: 5,
    height: 5,
    borderRadius: 10,
    ...Paddings.p.p5
  },
  mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Margins.mh.mh30,
        width: '84%',
        marginTop:10
      },
      errorInput: {
        borderColor: 'red',
      },
      errorText: {
        color: 'red',
         marginHorizontal:10
      },
});

export default styles;



