using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameSession : MonoBehaviour
{
  [SerializeField] Image Flop1Image;
  [SerializeField] Image Flop2Image;
  [SerializeField] Image Flop3Image;
  [SerializeField] Image TurnImage;
  [SerializeField] Image RiverImage;
  [SerializeField] AudioClip[] cardSounds;
  [SerializeField] AudioClip[] chipSounds;
  [SerializeField] Sprite[] cardImages;

  int numCardsDealt;
  int numCommunityCardsDealt;

  // Start is called before the first frame update
  void Start()
  {
    numCardsDealt = 0;    
    numCommunityCardsDealt = 0;    
  }

  // Update is called once per frame
  void Update()
  {
      
  }

  public void CallButtonPressed()
  {
    Debug.Log("Call");
    GetComponent<AudioSource>().PlayOneShot(chipSounds[Random.Range(0, chipSounds.Length)]);
  }
  
  public void FoldButtonPressed()
  {
    Debug.Log("Fold");
    GetComponent<AudioSource>().PlayOneShot(cardSounds[Random.Range(0, cardSounds.Length)]);
  }

  public void RaiseButtonPressed()
  {
    Debug.Log("Raise");
    GetComponent<AudioSource>().PlayOneShot(chipSounds[Random.Range(0, chipSounds.Length)]);
  }

  public void DealButtonPressed()
  {
    switch (numCommunityCardsDealt)
    {
      case 0:
        DealFlop();
        break;
      case 3:
        DealTurn();
        break;
      case 4:
        DealRiver();
        break;
      case 5:
        Reset();
        break;
    }
  }

  private void DealFlop()
  {
    Flop1Image.sprite = cardImages[Random.Range(0, cardImages.Length)];
    GetComponent<AudioSource>().PlayOneShot(cardSounds[Random.Range(0, cardSounds.Length)]);
    Flop2Image.sprite = cardImages[Random.Range(0, cardImages.Length)];
    GetComponent<AudioSource>().PlayOneShot(cardSounds[Random.Range(0, cardSounds.Length)]);
    Flop3Image.sprite = cardImages[Random.Range(0, cardImages.Length)];
    GetComponent<AudioSource>().PlayOneShot(cardSounds[Random.Range(0, cardSounds.Length)]);
    numCommunityCardsDealt = 3;
  }

  private void DealTurn()
  {
    TurnImage.sprite = cardImages[Random.Range(0, cardImages.Length)];
    GetComponent<AudioSource>().PlayOneShot(cardSounds[Random.Range(0, cardSounds.Length)]);
    numCommunityCardsDealt++;
  }

  private void DealRiver()
  {
    RiverImage.sprite = cardImages[Random.Range(0, cardImages.Length)];
    GetComponent<AudioSource>().PlayOneShot(cardSounds[Random.Range(0, cardSounds.Length)]);
    numCommunityCardsDealt++;
  }

  private void Reset()
  {
    numCommunityCardsDealt = 0;
    Sprite blank = Resources.Load<Sprite>("Sprites/Cards/blankCard");
    Flop1Image.sprite = blank;
    Flop2Image.sprite = blank;
    Flop3Image.sprite = blank;
    TurnImage.sprite = blank;
    RiverImage.sprite = blank;
  }

}
